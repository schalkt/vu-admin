<template>

    <div v-if="auth && auth.visible" class="vua-auth" :data-bs-theme="[theme]">

        <div class="row d-flex justify-content-center align-items-center min-vh-100" @click.stop="close">
            <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
                <div class="card shadow p-4 position-relative" @click.stop="">

                    <div class="position-absolute top-0 end-0 p-0 m-2">
                        <i v-if="loading" class="spinner-border spinner-border-sm text-primary"></i>
                        <button type="button" class="btn p-2" @click.stop="close">
                            <i class="bi bi-x px-1 text-muted"></i>
                        </button>
                    </div>

                    <h1 class="text-center mt-2 mb-4">
                        {{ settings.title[auth.panel] }}
                    </h1>

                    <form @submit.prevent="handleSubmit()" @click.stop="">

                        <div class="mb-3" v-if="auth.panel != 'activation' && auth.panel != 'password'">
                            <label for="email" class="form-label text-primary">{{ settings.username.label }}</label>
                            <div class="input-group">
                                <span v-if="settings.username.icon" class="input-group-text" :class="{ 'rounded-bottom-0': settings.username.help }">
                                    <i :class="[settings.username.icon]"></i>
                                </span>
                                <input id="email" name="email" :type="settings.username.type" v-model="username" class="form-control"
                                    :class="{ 'rounded-bottom-0': settings.username.help }" :placeholder="settings.username.placeholder" required :disabled="loading" />
                            </div>
                            <small class="d-block border border-top-0 rounded-bottom p-2 text-muted" v-if="settings.username.help" v-html="settings.username.help"></small>
                        </div>

                        <template v-if="auth.panel != 'forgot' && auth.panel != 'activation'">

                            <div class="mb-3">
                                <label v-if="settings.password.label" for="password" class="form-label text-primary">
                                    {{ settings.password.label }}
                                </label>
                                <div class="input-group">
                                    <span v-if="settings.password.icon" class="input-group-text"
                                        :class="{ 'rounded-bottom-0': (auth.panel == 'registration' || auth.panel == 'password') && settings.password.help }">
                                        <i :class="[settings.password.icon]"></i>
                                    </span>
                                    <input id="password" name="password" :type="settings.password.type" v-model="password" class="form-control"
                                        :class="{ 'rounded-bottom-0': auth.panel == 'registration' && settings.password.help }" :placeholder="settings.password.placeholder"
                                        :pattern="settings.password.pattern" :minlength="auth.panel == 'registration' ? settings.password.minlength : 1" required
                                        :disabled="loading" />
                                    <span v-if="auth.panel == 'registration' || auth.panel == 'password'" class="input-group-text"
                                        :class="{ 'rounded-bottom-0': (auth.panel == 'registration' || auth.panel == 'password') && settings.password.help }">
                                        <small class="" :class="{
                                            'text-success': password.length >= settings.password.minlength,
                                            'text-danger': password.length < settings.password.minlength,
                                        }">{{ password.length }}</small>
                                    </span>
                                    <span class="cursor-pointer input-group-text" @click.stop="toggleType('password')"
                                        :class="{ 'rounded-bottom-0': (auth.panel == 'registration' || auth.panel == 'password') && settings.password.help }">
                                        <i v-if="settings.password.type == 'password'" class="bi bi-eye"></i>
                                        <i v-else class="bi bi-eye-slash"></i>
                                    </span>
                                </div>
                                <small class="d-block border border-top-0 rounded-bottom p-2 text-muted"
                                    v-if="(auth.panel == 'registration' || auth.panel == 'password') && settings.password.help" v-html="settings.password.help"></small>
                            </div>

                            <div class="mb-4" v-if="auth.panel === 'registration' || auth.panel === 'password'">
                                <label for="password_again" class="form-label text-primary">
                                    {{ settings.password_again.label }}
                                    <small v-if="password_again.length > 0 && password_again != password" class="text-danger" v-html="settings.password_again.nomatch">
                                    </small>
                                </label>
                                <div class="input-group">
                                    <span v-if="settings.password.icon" class="input-group-text" :class="{ 'rounded-bottom-0': settings.password_again.help }">
                                        <i :class="[settings.password_again.icon]"></i>
                                    </span>
                                    <input id="password_again" name="password_again" :type="settings.password_again.type" v-model="password_again" class="form-control"
                                        :class="{ 'rounded-bottom-0': settings.password_again.help }" :placeholder="settings.password_again.placeholder"
                                        :minlength="settings.password.minlength" required :disabled="loading" />
                                    <span class="input-group-text" :class="{ 'rounded-bottom-0': settings.password_again.help }">
                                        <small class="" :class="{
                                            'text-success': password_again.length >= settings.password.minlength,
                                            'text-danger': password_again.length < settings.password.minlength,
                                        }">{{ password_again.length }}</small>
                                    </span>
                                    <span class="cursor-pointer input-group-text" @click.stop="toggleType('password_again')"
                                        :class="{ 'rounded-bottom-0': (auth.panel == 'registration' || auth.panel == 'password') && settings.password_again.help }">
                                        <i v-if="settings.password_again.type == 'password'" class="bi bi-eye"></i>
                                        <i v-else class="bi bi-eye-slash"></i>
                                    </span>
                                </div>
                                <small class="d-block border border-top-0 rounded-bottom p-2 text-muted"
                                    v-if="(auth.panel == 'registration' || auth.panel == 'password') && settings.password_again.help" v-html="settings.password_again.help"></small>
                            </div>

                            <!-- reCAPTCHA -->
                            <div class="mb-3 text-center">
                                <div class="g-recaptcha" :data-sitekey="recaptchaSiteKey" @click.stop="onCaptchaClick"></div>
                            </div>
                        </template>

                        <div class="mb-4 text-center" v-if="auth.panel == 'login' && settings.password.forgot">
                            <button type="button" class="btn btn-link p-0 text-decoration-none text-nowrap" @click.stop="toggleForgotPassword" v-html="settings.password.forgot">
                            </button>
                        </div>

                        <div class="d-flex mb-4" v-if="auth.panel == 'forgot' && settings.help && settings.help.forgot">
                            <small class="text-muted" v-html="settings.help.forgot"></small>
                        </div>

                        <div class="row">
                            <template v-for="(input, key) in settings.inputs" :key="key">
                                <div v-if="input.panels.indexOf(auth.panel) >= 0 && !input.hidden" :class="[input.colclass ? input.colclass : 'col-md-12']">
                                    <div class="mb-3">
                                        <label v-if="input.label" :for="key" class="form-label text-primary" :class="{ 'required': input.required }"
                                            v-html="getValueOrFunction(input.label)"></label>
                                        <div class="input-group">
                                            <span v-if="input.prefix" class="input-group-text" :class="{ 'rounded-bottom-0': input.help }"
                                                v-html="getValueOrFunction(input.prefix)">
                                            </span>

                                            <select v-if="input.type == 'select'" class="form-select" :disabled="loading" :required="input.required" v-model="inputs[key]"
                                                :multiple="input.multiple">
                                                <option></option>
                                                <option v-for="option in input.options" :key="option" :value="option.value" v-html="getValueOrFunction(option.label)">
                                                </option>
                                            </select>

                                            <input v-else :id="key" :name="key" :type="input.type" v-model="inputs[key]" class="form-control"
                                                :class="{ 'rounded-bottom-0': input.help }" :placeholder="input.placeholder" :required="input.required" :disabled="loading" />

                                            <span v-if="input.suffix" class="input-group-text" :class="{ 'rounded-bottom-0': input.help }"
                                                v-html="getValueOrFunction(input.suffix)"></span>

                                        </div>
                                        <small class="d-block border border-top-0 rounded-bottom p-2 text-muted" v-if="input.help" v-html="getValueOrFunction(input.help)">
                                        </small>
                                    </div>
                                </div>
                            </template>
                        </div>

                        <div v-for="accept in settings.accepts" :key="accept">

                            <div v-if="accept.panels.indexOf(auth.panel) >= 0" class="form-check">
                                <input type="checkbox" class="form-check-input" :id="'accept_' + accept.name" :name="'accept_' + accept.name" v-model="accepts[accept.name]"
                                    :required="accept.required" :disabled="loading" />
                                <label v-if="accept.label" class="form-check-label" :for="'accept_' + accept.name" v-html="getValueOrFunction(accept.label)">
                                </label>
                            </div>

                        </div>


                        <div v-if="auth.panel == 'registration' && settings.help && settings.help.registration" class="mt-4">
                            <div v-html="getValueOrFunction(settings.help.registration)"></div>
                        </div>

                        <div class="mt-3 text-center" v-if="auth.response.message">
                            <div :class="{ 'text-danger': !auth.response.ok, 'text-success': auth.response.ok }" v-html="auth.response.message"></div>
                        </div>

                        <div class="mt-4 d-flex justify-content-between">
                            <button v-if="auth.panel != 'login' && auth.panel != 'activation'" type="button" @click.stop="toggleClear"
                                class="btn btn-secondary w-100 me-2 text-nowrap" :disabled="loading">
                                <i class="bi bi-arrow-left-square mx-1"></i> {{ settings.submit.login }}
                            </button>
                            <button v-if="auth.panel == 'login'" type="button" class="btn btn-warning w-100 me-2 text-nowrap" @click.stop="toggleNewRegistration"
                                :disabled="loading">
                                <i class="bi bi-person-plus mx-1"></i> {{ settings.submit.registration }}
                            </button>
                            <button type="submit" class="btn w-100 text-nowrap"
                                :class="{ 'btn-primary': auth.panel != 'registration', 'btn-warning': auth.panel == 'registration' }" :disabled="loading">
                                {{ settings.submit[auth.panel] }}
                                <i v-if="auth.panel == 'registration'" class="bi bi-person-plus mx-1"></i>
                                <i v-else class="bi bi-arrow-right-square mx-1"></i>
                            </button>
                        </div>


                        <div class="mt-2 text-end">
                            <button type="button" @click.stop="close" class="btn btn-light border w-100 me-1" :disabled="loading">
                                {{ settings.submit.cancel }} <i class="bi bi-x-square mx-1"></i>
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>

        <div v-cloak class="modal shadow" :id="modalId" tabindex="-1">
            <div class="modal-dialog modal-xl">
                <div class="modal-content h-100">
                    <VuAdminForm v-cloak v-if="settings.form && settings.form.visible && settings.form.groups" v-model="item" :formid="formId" :settings="settings"
                        :modalWindow="modalWindow" :auth="auth" :saveItem="saveItem" :deleteItem="deleteItem" :reloadTable="reloadTable" :fetchRelation="fetchRelation">
                    </VuAdminForm>
                </div>
            </div>
        </div>

    </div>



</template>

<script>

import mitt from 'mitt';
import VuAdminForm from "./VuAdminForm.vue";
import { sha512 } from "js-sha512";
import { Modal } from "bootstrap";
import {
    translate,
    getValueOrFunction,
} from "./helpers";


const eventBus = mitt();

const VuAuth = {
    name: "VuAuth",
    props: {
        modelValue: Object,
    },
    data() {
        return {
            theme: "light",
            auth: undefined,
            username: "",
            password: "",
            password_again: "",
            accepts: {},
            inputs: {},
            recaptchaSiteKey: null, // Itt add meg a reCAPTCHA kulcsot
            responseMessage: null,
            captcha: {
                items: ["A", "B", "C", "D", "E"],
                required: "D",
                selected: null
            },
            loading: false,
            modalId: null,
            modalElement: null,
            modalWindow: null,
        };
    },
    components: {
        VuAdminForm
    },
    watch: {
        modelValue(newValue, oldValue) {
            if (newValue != oldValue) {
                this.auth = newValue;
                this.updateInputs();
                this.$forceUpdate();
            }
        },
    },


    methods: {

        detectQuery() {

            const url = new URL(window.location.href);

            if (url.searchParams.has('vuparams')) {

                let vuparams = url.searchParams.get('vuparams');

                if (vuparams) {

                    let params = JSON.parse(vuparams);

                    if (params.panel) {
                        this.auth.panel = params.panel
                        this.auth.visible = true;
                        this.auth.inputs = params.inputs ? params.inputs : null;
                        this.updateInputs();
                    }

                    url.searchParams.delete('vuparams');
                    window.history.replaceState({}, '', url.toString());

                }

            }

        },

        updateInputs() {

            if (this.auth.inputs) {
                this.inputs = Object.assign(this.inputs, this.auth.inputs);
            }

        },

        checkStorage() {

            let user = localStorage.getItem('vu-user');
            let header = localStorage.getItem('vu-header');
            let settings = localStorage.getItem('vu-settings');

            if (typeof user === 'string' && user && user[0] === '{') {
                this.auth.user = JSON.parse(user);
            }

            if (typeof header === 'string' && header && header[0] === '{') {
                this.auth.header = JSON.parse(header);
            }

            if (typeof settings === 'string' && settings && settings[0] === '{') {
                this.auth.settings = JSON.parse(settings);
            }

            if (!this.auth.user || !this.auth.header) {                
                this.logout();
            } else {
                this.auth.success = true;
                this.authUpdate();     
            }

        },

        async loadProfile() {

            try {

                const response = await fetch(this.settings.api.profile, {
                    method: "GET",
                    headers: this.auth.header
                });

                //await this.getStatusAndJson(response);

                if (response.ok) {                    
                    //this.onSuccess('profile');
                } else {
                    this.onError('profile');
                    return;
                }

            } catch (error) {
                this.onError('profile');
            }
        },

        logout() {
            this.auth.success = false;
            this.auth.header = null;
            this.auth.settings = null;
            this.auth.user = null;
            this.authUpdate();

            localStorage.removeItem('vu-user');
            localStorage.removeItem('vu-header');
            localStorage.removeItem('vu-settings');
        },

        reset() {
            this.password = "";
            this.password_again = "";
            this.auth.response = {};
        },

        close() {
            this.auth.visible = false;
            this.authUpdate();
            this.reset();
        },

        toggleClear() {
            this.auth.panel = 'login';
            this.reset();
        },

        toggleForgotPassword() {
            this.auth.panel = this.auth.panel !== 'forgot' ? 'forgot' : 'login';
            this.reset();
        },

        toggleNewRegistration() {
            this.auth.panel = this.auth.panel !== 'registration' ? 'registration' : 'login';
            this.reset();
        },

        toggleType(field) {
            this.settings[field].type = this.settings[field].type !== 'password' ? 'password' : 'text';
            this.$forceUpdate();
        },

        async getStatusAndJson(response) {
            this.auth.response.code = response.status;

            try {
                this.auth.response.data = await response.json();
            } catch (error) {
                this.auth.response.data = null;
                console.error('Error parsing response:', error);
            }
        },

        onSuccess(panel) {

            this.auth.response.ok = true;

            if (this.settings.onSuccess && this.settings.onSuccess[panel]) {
                this.settings.onSuccess[panel](this.auth);

                if (!this.auth.header) {
                    this.auth.header = {};
                }

                if (this.auth.user.role) {
                    this.auth.header['X-Auth-Role'] = this.auth.user.role;
                } else if (this.auth.user.roles) {
                    this.auth.user.role = this.auth.user.roles[0];
                    this.auth.header['X-Auth-Role'] = this.auth.user.role;
                }

                if (this.auth.user.token) {
                    this.auth.header['X-Auth-Token'] = this.auth.user.token;
                }

                this.auth.success = true;

                localStorage.setItem('vu-user', JSON.stringify(this.auth.user));
                localStorage.setItem('vu-header', JSON.stringify(this.auth.header));
                localStorage.setItem('vu-settings', JSON.stringify(this.auth.settings));
            }

            setTimeout(() => {
                this.authUpdate();
                this.$forceUpdate();
            }, 0);
        },

        onError(panel) {
            this.auth.success = false;
            this.auth.response.ok = false;

            if (this.settings.onError && this.settings.onError[panel]) {
                this.settings.onError[panel](this.auth);
            }

            setTimeout(() => {
                this.authUpdate();
                this.$forceUpdate();
            }, 0);
        },

        onPasswordReset(panel) {
            this.auth.response.ok = true;

            if (this.settings.onSuccess && this.settings.onSuccess[panel]) {
                this.settings.onSuccess[panel](this.auth);
            }

            setTimeout(() => {
                this.$forceUpdate();
            }, 0);
        },

        onPasswordUpdate(panel) {
            this.auth.response.ok = true;

            if (this.settings.onSuccess && this.settings.onSuccess[panel]) {
                this.settings.onSuccess[panel](this.auth);
            }

            setTimeout(() => {
                this.$forceUpdate();
            }, 0);
        },

        async handleSubmit() {
            this.loading = true;

            try {
                switch (this.auth.panel) {
                    case 'login':
                        await this.handleLogin();
                        break;
                    case 'forgot':
                        await this.handleForgotPasswordSubmit();
                        break;
                    case 'registration':
                        await this.handleNewRegistrationSubmit();
                        break;
                    case 'activation':
                        await this.handleActivationSubmit();
                        break;
                    case 'password':
                        await this.handlePasswordSubmit();
                        break;
                }
            } finally {
                this.loading = false;
            }
        },

        async handleLogin() {
            this.auth.response = {};

            if (!this.username || !this.password) {
                return;
            }

            const response = await fetch(this.settings.api.login, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: this.username,
                    password: await this.hashPassword(this.password),
                    accept: this.accepts,
                }),
            });

            await this.getStatusAndJson(response);

            if (response.ok) {
                this.onSuccess('login');
                this.close();
            } else {
                this.onError('login');
            }
        },

        async handleNewRegistrationSubmit() {
            this.auth.response = {};

            if (!this.username || !this.password || !this.password_again || this.password !== this.password_again) {
                return;
            }

            const response = await fetch(this.settings.api.register, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: this.username,
                    password: await this.hashPassword(this.password),
                    accept: this.accepts,
                    input: this.inputs,
                }),
            });

            await this.getStatusAndJson(response);

            if (response.ok) {
                this.onSuccess('registration');
            } else {
                this.onError('registration');
            }
        },

        async handleActivationSubmit() {
            this.auth.response = {};

            const response = await fetch(this.settings.api.activation, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.inputs),
            });

            await this.getStatusAndJson(response);

            if (response.ok) {
                this.onSuccess('activation');
                this.close();
            } else {
                this.onError('activation');
            }
        },

        async handleForgotPasswordSubmit() {

            this.auth.response = {};

            try {
                const response = await fetch(this.settings.api.forgot, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: this.username,
                    }),
                });

                await this.getStatusAndJson(response);

                if (response.ok) {
                    this.onPasswordReset('forgot');
                } else {
                    this.onError('forgot');
                }
            } catch (error) {
                this.onError('forgot');
            }
        },

        async handlePasswordSubmit() {
            this.auth.response = {};

            if (!this.password || !this.password_again || this.password !== this.password_again) {
                return;
            }

            try {
                const response = await fetch(this.settings.api.password, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...this.auth.header
                    },
                    body: JSON.stringify({
                        password: await this.hashPassword(this.password),
                        ...this.inputs
                    }),
                });

                await this.getStatusAndJson(response);

                if (response.ok) {
                    this.onPasswordUpdate('password');
                } else {
                    this.onError('password');
                }
            } catch (error) {
                this.onError('password');
            }
        },

        async hashPassword(password) {
            this.settings.password.hash = this.settings.password.hash === undefined ? 0 : this.settings.password.hash;
            return this.generateHash(password, this.settings.password.hash);
        },

        async generateHash(input, iterations) {
            let output = input;
            for (let i = 0; i < iterations; i++) {
                output = sha512(output);
            }
            return output;
        },

        authUpdate() {
            this.$emit("update:modelValue", this.auth);
        },

        handleEscapeKey(event) {
            if (event.key === "Escape") {
                this.close();
            }
        },

        getValueOrFunction(object, params) {
            return getValueOrFunction(object, params, this.settings, this);
        },

        translate(key, vars, language) {
            return translate(key, this.settings.translate, vars, language ? language : this.settings.language);
        },

        onCaptchaClick() {
            // reCAPTCHA validálás
            console.log("reCAPTCHA clicked");
        },

    },

    created() {
        if (window.VuSettings && window.VuSettings.auth) {
            this.theme = window.VuSettings.theme ? window.VuSettings.theme : "light";
            this.settings = window.VuSettings.auth;
        }

        let uid = Math.round(Math.random() * 100000);

        this.formId = "form_profil_" + uid;
        this.modalId = "modal_profil_" + uid;

    },
    mounted() {

        window.addEventListener("keydown", this.handleEscapeKey);

        // Töltsd be a reCAPTCHA scriptet, ha még nem érhető el
        if (this.recaptchaSiteKey && !document.querySelector('script[src="https://www.google.com/recaptcha/api.js"]')) {
            const script = document.createElement("script");
            script.src = "https://www.google.com/recaptcha/api.js";
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        }

        if (this.settings.username.value) {
            this.username = this.settings.username.value;
        }

        if (!this.auth) {
            this.auth = {
                user: undefined,
                header: undefined,
                settings: undefined,
                success: false,
                response: {
                    ok: false,
                    message: null,
                    data: null,
                },
            };            
        }
        
        console.log(this.auth);
           
        this.checkStorage();
        this.reset();
        this.updateInputs();
        this.$forceUpdate();
        this.detectQuery();

        if (this.settings.debug) {
            console.log('vu-auth mounted ', __APP_VERSION__);
        }


        // this.modalElement = document.getElementById(this.modalId);
        // this.modalWindow = new Modal(this.modalElement);

        // this.modalElement.addEventListener('hidden.bs.modal', event => {
        //     this.settings.form.visible = false;
        // });

        // this.modalElement.addEventListener('show.bs.modal', event => {
        //     this.settings.form.visible = true;
        // });


    },
    beforeUnmount() {
        window.removeEventListener("keydown", this.handleEscapeKey);
    },
};

export default VuAuth;
export { VuAuth };

</script>

<style lang="scss">
.vua-auth {

    position: fixed;
    inset: 0px;
    background-color: var(--bs-body-bg);
    z-index: 99999;

    .cursor-pointer {
        cursor: pointer;
    }

    .card {

        border-radius: 8px;
        max-height: 100vh;
        overflow-y: auto;

        label.required::after {
            content: " *";
        }

        input {

            font-weight: bold;

            &::placeholder {
                font-weight: lighter;
                opacity: 0.5;
            }

        }

        a.link {
            position: relative;
            display: inline-block;
            text-decoration: none;
            transition: all 0.15s ease;
        }

        a.link:before {
            content: "\F135";
            padding-left: 3px;
            padding-right: 6px;
            display: inline-block;
            font-family: "bootstrap-icons" !important;
            font-weight: 100;
            font-style: normal;
            font-variant: normal;
            text-rendering: auto;
            -webkit-font-smoothing: antialiased;
            transition: all 0.25s;
            vertical-align: text-top;
            color: #4b89e7;
        }

        a.link:hover:before {
            padding-left: 6px;
            padding-right: 3px;
        }

    }

}
</style>