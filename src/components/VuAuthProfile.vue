<template>
    <form class="vua-auth-profile-data" @submit.prevent="save" @click.stop="" novalidate>

        <!-- avatar: chosen image → cropped to a square and resized in the browser, sent with the data -->
        <div v-if="avatarEnabled" class="d-flex align-items-center gap-3 mb-3">
            <img v-if="avatarPreview" :src="avatarPreview" :width="64" :height="64" class="vua-auth-profile-avatar rounded-circle border" alt="">
            <div v-else class="vua-auth-profile-avatar rounded-circle border bg-body-secondary d-flex align-items-center justify-content-center"
                style="width:64px;height:64px">
                <i class="bi bi-person fs-3 text-secondary"></i>
            </div>
            <div>
                <label class="btn btn-sm btn-outline-secondary mb-0" :class="{ disabled: saving }">
                    <i class="bi bi-image me-1"></i>{{ t('Change avatar') }}
                    <input type="file" class="d-none" name="avatar" :accept="avatarAccept" :disabled="saving" @change="pickAvatar">
                </label>
                <div v-if="avatarError" class="small text-danger mt-1">{{ t(avatarError) }}</div>
            </div>
        </div>

        <!-- fields in a grid: two columns from md (field.class, default col-md-6; textarea col-12) -->
        <div class="row g-3 mb-3">
            <div v-for="field in fields" :key="field.name" :class="fieldClass(field)" :data-field="field.name">
                <label :for="'vua-profile-' + field.name" class="form-label text-primary">{{ t(field.label || field.name) }}</label>
                <!-- readonly: shown, not editable, not sent -->
                <input v-if="field.readonly" :id="'vua-profile-' + field.name" :name="field.name" type="text" :value="displayValue(field)"
                    class="form-control bg-body-secondary" readonly tabindex="-1" />
                <select v-else-if="field.type === 'select'" :id="'vua-profile-' + field.name" :name="field.name" v-model="values[field.name]"
                    class="form-select" :class="{ 'is-invalid': errors[field.name] }" :required="!!field.required" :disabled="saving">
                    <option v-if="!field.required" value=""></option>
                    <option v-for="option in options(field)" :key="option.value" :value="option.value">{{ t(option.label) }}</option>
                </select>
                <textarea v-else-if="field.type === 'textarea'" :id="'vua-profile-' + field.name" :name="field.name" v-model.trim="values[field.name]"
                    class="form-control" :class="{ 'is-invalid': errors[field.name] }" :rows="field.rows || 3" :required="!!field.required"
                    :maxlength="field.maxlength || null" :disabled="saving"></textarea>
                <input v-else :id="'vua-profile-' + field.name" :name="field.name" :type="field.type || 'text'" v-model.trim="values[field.name]"
                    class="form-control" :class="{ 'is-invalid': errors[field.name] }" :required="!!field.required"
                    :maxlength="field.maxlength || null" :min="field.min" :max="field.max" :autocomplete="field.autocomplete || null"
                    :disabled="saving" />
                <div v-if="errors[field.name]" class="invalid-feedback">{{ t(errors[field.name]) }}</div>
                <div v-if="field.help && !errors[field.name]" class="form-text">{{ t(field.help) }}</div>
                <!-- e-mail change waiting for the confirmation link -->
                <div v-if="field.name === 'email' && pendingEmail" class="vua-auth-profile-pending form-text text-warning-emphasis">
                    <i class="bi bi-hourglass-split me-1"></i>{{ t('Waiting for confirmation: {email}', { email: pendingEmail }) }}
                </div>
            </div>
        </div>

        <div v-if="message" class="vua-auth-profile-message mt-3 text-center" :class="ok ? 'text-success' : 'text-danger'"
            style="white-space: pre-line">{{ t(message, messageVars) }}</div>

        <div class="mt-4">
            <button type="submit" class="btn btn-primary w-100 text-nowrap" :disabled="saving">
                <span v-if="saving" class="spinner-border spinner-border-sm me-1" aria-hidden="true"></span>
                {{ t('Save') }} <i class="bi bi-check2-square mx-1"></i>
            </button>
        </div>
    </form>
</template>

<script>
import { safeUrl, getResponseJson, isApiResponseOk } from "./helpers";

// window.VuSettings.auth.profile.fields: the shown / editable own data of the signed-in user (keys of auth.user):
// { name, label, type: text | email | tel | date | number | textarea | select, options (select: [{ value, label }] or
// ['a', 'b']), required, maxlength, min, max, pattern (RegExp source), help, readonly (shown, not editable, not sent),
// autocomplete, class }
const DEFAULT_FIELDS = [
    { name: "firstName", label: "First name", required: true, maxlength: 50, autocomplete: "given-name" },
    { name: "lastName", label: "Last name", required: true, maxlength: 50, autocomplete: "family-name" },
    { name: "email", label: "E-mail", type: "email", required: true, maxlength: 100, autocomplete: "email" },
    { name: "phone", label: "Phone", type: "tel", maxlength: 30, autocomplete: "tel" },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9 ()\-/]{6,30}$/;

// the chosen image as a square (center crop) data URL of `size` px
function resizeImage(file, size, type) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error("read"));
        reader.onload = () => {
            const image = new Image();
            image.onerror = () => reject(new Error("image"));
            image.onload = () => {
                const side = Math.min(image.naturalWidth, image.naturalHeight);
                const canvas = document.createElement("canvas");
                canvas.width = size;
                canvas.height = size;
                canvas.getContext("2d").drawImage(image, (image.naturalWidth - side) / 2, (image.naturalHeight - side) / 2, side, side, 0, 0, size, size);
                resolve(canvas.toDataURL(type, 0.9));
            };
            image.src = reader.result;
        };
        reader.readAsDataURL(file);
    });
}

const VuAuthProfile = {
    name: "VuAuthProfile",
    props: {
        // the auth object of VuAuth (auth.user, auth.header)
        auth: { type: Object, required: true },
        // window.VuSettings.auth
        settings: { type: Object, required: true },
        // translate(key, vars) of VuAuth (its language, its dictionary)
        translate: { type: Function, required: true },
        // a message to show at first (e.g. the result of an e-mail confirmation link)
        notice: { type: Object, default: null },
    },
    emits: ["saved"],
    data() {
        return {
            values: {},
            errors: {},
            avatar: null,
            avatarError: "",
            saving: false,
            ok: false,
            message: "",
            messageVars: null,
        };
    },
    computed: {
        profile() {
            return this.settings.profile || {};
        },
        fields() {
            const fields = Array.isArray(this.profile.fields) && this.profile.fields.length ? this.profile.fields : DEFAULT_FIELDS;
            return fields.filter((field) => field && field.name && !field.hidden);
        },
        editableFields() {
            return this.fields.filter((field) => !field.readonly);
        },
        // profile.avatar: true or { size: 256 (px), maxSize: 5 MB, type: 'image/jpeg' } → avatar upload; off by default
        avatarSettings() {
            const avatar = this.profile.avatar;
            if (!avatar) {
                return null;
            }
            return Object.assign({ size: 256, maxSize: 5 * 1024 * 1024, type: "image/jpeg" }, typeof avatar === "object" ? avatar : {});
        },
        avatarEnabled() {
            return !!this.avatarSettings;
        },
        avatarAccept() {
            return "image/png,image/jpeg,image/webp,image/gif";
        },
        avatarPreview() {
            return this.avatar || safeUrl(this.auth.user && this.auth.user.image) || "";
        },
        pendingEmail() {
            return this.auth.user && this.auth.user.pendingEmail ? this.auth.user.pendingEmail : "";
        },
        url() {
            return (this.settings.api && this.settings.api.updateProfile) || "/api/auth/profile";
        },
    },
    watch: {
        notice: {
            immediate: true,
            handler(value) {
                if (value && value.message) {
                    this.ok = !!value.ok;
                    this.message = value.message;
                    this.messageVars = null;
                }
            },
        },
    },
    created() {
        this.fill();
    },
    methods: {
        t(key, vars) {
            return this.translate(key, vars);
        },
        // the column of a field: its own `class`, else half width from md (a textarea: full width)
        fieldClass(field) {
            if (field.class) {
                return field.class;
            }
            return field.type === "textarea" ? "col-12" : "col-12 col-md-6";
        },
        // select options: [{ value, label }] or plain values
        options(field) {
            return (Array.isArray(field.options) ? field.options : []).map((option) =>
                option && typeof option === "object" ? option : { value: option, label: String(option) });
        },
        // a readonly field's text (a select shows its option's label)
        displayValue(field) {
            const user = this.auth.user || {};
            const value = user[field.name] !== undefined && user[field.name] !== null ? String(user[field.name]) : "";
            if (field.type === "select") {
                const option = this.options(field).find((item) => String(item.value) === value);
                return option ? this.t(option.label) : value;
            }
            return value;
        },
        fill() {
            const user = this.auth.user || {};
            const values = {};
            this.editableFields.forEach((field) => {
                values[field.name] = user[field.name] !== undefined && user[field.name] !== null ? String(user[field.name]) : "";
            });
            this.values = values;
        },
        async pickAvatar(event) {
            const file = event.target.files && event.target.files[0];
            event.target.value = "";
            this.avatarError = "";
            if (!file) {
                return;
            }
            if (!/^image\/(png|jpeg|webp|gif)$/.test(file.type)) {
                this.avatarError = "Choose a PNG, JPEG, WebP or GIF image.";
                return;
            }
            if (file.size > this.avatarSettings.maxSize) {
                this.avatarError = "The image is too large.";
                return;
            }
            try {
                this.avatar = await resizeImage(file, this.avatarSettings.size, this.avatarSettings.type);
            } catch (e) {
                this.avatarError = "The image could not be read.";
            }
        },
        validate() {
            const errors = {};
            this.editableFields.forEach((field) => {
                const value = this.values[field.name] || "";
                let pattern = null;
                try {
                    pattern = field.pattern ? new RegExp(field.pattern) : null;
                } catch (e) {
                    pattern = null;
                }
                if (field.required && !value) {
                    errors[field.name] = "Required field";
                } else if (value && field.type === "email" && !EMAIL_PATTERN.test(value)) {
                    errors[field.name] = "Invalid e-mail address";
                } else if (value && field.type === "tel" && !PHONE_PATTERN.test(value)) {
                    errors[field.name] = "Invalid phone number";
                } else if (value && field.type === "select" && !this.options(field).some((option) => String(option.value) === value)) {
                    errors[field.name] = "Invalid value";
                } else if (value && pattern && !pattern.test(value)) {
                    errors[field.name] = field.patternMessage || "Invalid value";
                }
            });
            this.errors = errors;
            return !Object.keys(errors).length;
        },
        // only the changed values (and the new avatar) are sent
        changes() {
            const user = this.auth.user || {};
            const changes = {};
            this.editableFields.forEach((field) => {
                const value = this.values[field.name] || "";
                const current = user[field.name] !== undefined && user[field.name] !== null ? String(user[field.name]) : "";
                // a pending e-mail change counts as the current value (no second link for the same address)
                if (value !== current && !(field.name === "email" && value === this.pendingEmail)) {
                    changes[field.name] = value;
                }
            });
            if (this.avatar) {
                changes.image = this.avatar;
            }
            return changes;
        },
        async save() {
            this.message = "";
            if (!this.validate()) {
                return;
            }
            const changes = this.changes();
            if (!Object.keys(changes).length) {
                this.ok = true;
                this.message = "Nothing to save";
                return;
            }

            this.saving = true;
            let response = null;
            let json = {};
            try {
                response = await fetch(this.url, {
                    method: "POST",
                    headers: Object.assign({ "Content-Type": "application/json" }, this.auth.header || {}),
                    body: JSON.stringify(changes),
                });
                json = await getResponseJson(response);
            } catch (e) {
                this.saving = false;
                this.ok = false;
                this.message = "Network error";
                return;
            }
            this.saving = false;

            const data = json && json.data && typeof json.data === "object" ? json.data : {};
            this.ok = isApiResponseOk(response, json);
            if (!this.ok) {
                // field errors of the server: { errors: { email: 'This e-mail address is already taken' } }
                if (data.errors && typeof data.errors === "object") {
                    this.errors = Object.assign({}, data.errors);
                }
                this.message = response.status === 429 ? "Too many attempts, please try again later" : (data.message || "Saving failed");
                return;
            }

            // the server's user (without the token), else the sent values; the e-mail changes only after the
            // confirmation link (pendingEmail)
            const update = Object.assign({}, changes, data);
            delete update.message;
            delete update.accessToken;
            delete update.password;
            if (data.pendingEmail && changes.email && data.email === undefined) {
                delete update.email;
            }
            Object.assign(this.auth.user, update);
            if (this.auth.user.pendingEmail && this.auth.user.pendingEmail === this.auth.user.email) {
                delete this.auth.user.pendingEmail;
            }
            try {
                localStorage.setItem("vu-user", JSON.stringify(this.auth.user));
            } catch (e) {
                // storage blocked: the session works, it is just not kept
            }
            this.avatar = null;
            this.fill();

            if (data.pendingEmail && changes.email) {
                this.message = "Saved. We sent a confirmation link to {email}; the address changes when you open it.";
                this.messageVars = { email: data.pendingEmail };
            } else {
                this.message = data.message || "Profile saved";
                this.messageVars = null;
            }
            this.$emit("saved", this.auth.user);
        },
    },
};

export default VuAuthProfile;
export { VuAuthProfile };
</script>
