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
                        {{ translate(panelText('title')) }}
                    </h1>

                    <!-- profile: the signed-in user, then the password change -->
                    <div v-if="auth.panel == 'profile' && auth.user" class="vua-auth-profile d-flex align-items-center gap-3 border rounded p-3 mb-4">
                        <img v-if="auth.user.image" :src="safeUrl(auth.user.image)" width="48" height="48" class="rounded-circle border" alt="">
                        <div class="min-w-0">
                            <div class="fw-semibold">{{ [auth.user.firstName, auth.user.lastName].join(' ').trim() || auth.user.username }}</div>
                            <div class="small text-secondary text-truncate">{{ auth.user.email }}</div>
                            <span v-if="auth.user.role" class="badge text-bg-secondary mt-1">{{ auth.user.role }}</span>
                        </div>
                    </div>
                    <h2 v-if="auth.panel == 'profile'" class="h6 text-secondary text-uppercase mb-3">{{ translate('Change password') }}</h2>

                    <form @submit.prevent="handleSubmit()" @click.stop="">

                        <div class="mb-3" v-if="auth.panel != 'activation' && auth.panel != 'password' && auth.panel != 'twofa' && auth.panel != 'profile'">
                            <label for="email" class="form-label text-primary">{{ translate(settings.username.label) }}</label>
                            <div class="input-group">
                                <span v-if="settings.username.icon" class="input-group-text" :class="{ 'rounded-bottom-0': settings.username.help }">
                                    <i :class="[settings.username.icon]"></i>
                                </span>
                                <input id="email" name="email" :type="settings.username.type" v-model="username" class="form-control"
                                    :class="{ 'rounded-bottom-0': settings.username.help }" :placeholder="translate(settings.username.placeholder)" required :disabled="loading" />
                            </div>
                            <small class="d-block border border-top-0 rounded-bottom p-2 text-muted" v-if="settings.username.help" v-html="translate(settings.username.help)"></small>
                        </div>

                        <template v-if="auth.panel != 'forgot' && auth.panel != 'activation' && auth.panel != 'twofa'">

                            <div v-if="auth.panel == 'profile'" class="mb-3">
                                <label for="password_current" class="form-label text-primary">{{ translate('Current password') }}</label>
                                <div class="input-group">
                                    <span v-if="settings.password.icon" class="input-group-text"><i :class="[settings.password.icon]"></i></span>
                                    <input id="password_current" name="password_current" :type="currentPasswordType" v-model="password_current" class="form-control"
                                        autocomplete="current-password" required :disabled="loading" />
                                    <span class="cursor-pointer input-group-text" @click.stop="currentPasswordType = currentPasswordType == 'password' ? 'text' : 'password'">
                                        <i v-if="currentPasswordType == 'password'" class="bi bi-eye"></i>
                                        <i v-else class="bi bi-eye-slash"></i>
                                    </span>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label v-if="settings.password.label" for="password" class="form-label text-primary">
                                    {{ translate(auth.panel == 'profile' ? 'New password' : settings.password.label) }}
                                </label>
                                <div class="input-group">
                                    <span v-if="settings.password.icon" class="input-group-text"
                                        :class="{ 'rounded-bottom-0': newPasswordPanel && settings.password.help }">
                                        <i :class="[settings.password.icon]"></i>
                                    </span>
                                    <input id="password" name="password" :type="settings.password.type" v-model="password" class="form-control"
                                        :class="{ 'rounded-bottom-0': newPasswordPanel && settings.password.help }" :placeholder="translate(settings.password.placeholder)"
                                        :pattern="settings.password.pattern" :minlength="auth.panel == 'registration' || auth.panel == 'profile' ? settings.password.minlength : 1" required
                                        :disabled="loading" />
                                    <span v-if="newPasswordPanel" class="input-group-text"
                                        :class="{ 'rounded-bottom-0': newPasswordPanel && settings.password.help }">
                                        <small class="" :class="{
                                            'text-success': password.length >= settings.password.minlength,
                                            'text-danger': password.length < settings.password.minlength,
                                        }">{{ password.length }}</small>
                                    </span>
                                    <span class="cursor-pointer input-group-text" @click.stop="toggleType('password')"
                                        :class="{ 'rounded-bottom-0': newPasswordPanel && settings.password.help }">
                                        <i v-if="settings.password.type == 'password'" class="bi bi-eye"></i>
                                        <i v-else class="bi bi-eye-slash"></i>
                                    </span>
                                </div>
                                <small class="d-block border border-top-0 rounded-bottom p-2 text-muted"
                                    v-if="newPasswordPanel && settings.password.help" v-html="translate(settings.password.help)"></small>
                            </div>

                            <div class="mb-4" v-if="newPasswordPanel">
                                <label for="password_again" class="form-label text-primary">
                                    {{ translate(settings.password_again.label) }}
                                    <small v-if="password_again.length > 0 && password_again != password" class="text-danger" v-html="translate(settings.password_again.nomatch)">
                                    </small>
                                </label>
                                <div class="input-group">
                                    <span v-if="settings.password.icon" class="input-group-text" :class="{ 'rounded-bottom-0': settings.password_again.help }">
                                        <i :class="[settings.password_again.icon]"></i>
                                    </span>
                                    <input id="password_again" name="password_again" :type="settings.password_again.type" v-model="password_again" class="form-control"
                                        :class="{ 'rounded-bottom-0': settings.password_again.help }" :placeholder="translate(settings.password_again.placeholder)"
                                        :minlength="settings.password.minlength" required :disabled="loading" />
                                    <span class="input-group-text" :class="{ 'rounded-bottom-0': settings.password_again.help }">
                                        <small class="" :class="{
                                            'text-success': password_again.length >= settings.password.minlength,
                                            'text-danger': password_again.length < settings.password.minlength,
                                        }">{{ password_again.length }}</small>
                                    </span>
                                    <span class="cursor-pointer input-group-text" @click.stop="toggleType('password_again')"
                                        :class="{ 'rounded-bottom-0': newPasswordPanel && settings.password_again.help }">
                                        <i v-if="settings.password_again.type == 'password'" class="bi bi-eye"></i>
                                        <i v-else class="bi bi-eye-slash"></i>
                                    </span>
                                </div>
                                <small class="d-block border border-top-0 rounded-bottom p-2 text-muted"
                                    v-if="newPasswordPanel && settings.password_again.help" v-html="translate(settings.password_again.help)"></small>
                            </div>

                        </template>

                        <!-- Click-captcha — outside the forgot/activation exclusion so it shows on all configured panels -->
                        <div v-if="captchaRequired" class="mb-3">
                            <div v-if="captcha.loading" class="text-center py-2">
                                <span class="spinner-border spinner-border-sm text-secondary"></span>
                            </div>
                            <div v-else-if="captcha.items.length">
                                <div class="text-center small mb-2" v-html="captchaQuestion"></div>
                                <div class="d-flex justify-content-center gap-2 flex-wrap">
                                    <button v-for="item in captcha.items" :key="item.id" type="button"
                                        class="btn btn-outline-secondary px-2 py-1"
                                        :class="{ 'btn-primary border-primary': captcha.answers.includes(item.id) }"
                                        @click.stop="toggleCaptchaAnswer(item.id); captchaError = false">
                                        <i :class="['bi', item.icon]" style="font-size:1.2rem;display:block"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p v-if="captchaError" class="text-danger text-center small mt-2 mb-3 fw-semibold">
                            {{ translate(settings.captcha.error) }}
                        </p>

                        <!-- 2FA code input -->
                        <div v-if="auth.panel === 'twofa' && settings.twofa" class="mb-3">
                            <p class="text-center small text-muted mb-3" v-html="translate(settings.twofa.info)"></p>
                            <label class="form-label text-primary">{{ translate(settings.twofa.label) }}</label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-shield-lock"></i></span>
                                <input type="text" inputmode="numeric" pattern="[0-9]{6}"
                                    v-model="twofaCode" @input="twofaCode = twofaCode.replace(/\D/g, '').slice(0, 6)"
                                    class="form-control text-center fw-bold fs-5"
                                    :placeholder="translate(settings.twofa.placeholder)" required :disabled="loading"
                                    autocomplete="one-time-code" />
                            </div>
                            <!-- "trust this device": no code on this browser for the chosen days (server caps it) -->
                            <div v-if="twofaTrustOptions.length" class="mt-3">
                                <label for="twofa_trust" class="form-label text-primary">{{ translate(settings.twofa.trust.label) }}</label>
                                <select id="twofa_trust" class="form-select" v-model.number="twofaTrustDays" :disabled="loading">
                                    <option v-for="option in twofaTrustOptions" :key="option.value" :value="option.value">
                                        {{ translate(option.label) }}
                                    </option>
                                </select>
                                <small v-if="settings.twofa.trust.help" class="d-block text-muted mt-1" v-html="translate(settings.twofa.trust.help)"></small>
                            </div>
                            <div class="text-end mt-2">
                                <button type="button" class="btn btn-link btn-sm p-0 text-decoration-none"
                                    @click.stop="resendTwofa" :disabled="loading">
                                    <i class="bi bi-arrow-repeat me-1"></i>{{ translate(settings.submit.resend) }}
                                </button>
                            </div>
                        </div>

                        <!-- Honeypot (bots fill this in, humans don't see it) -->
                        <input type="text" name="vu_b4t" tabindex="-1" autocomplete="new-password" aria-hidden="true"
                            v-model="honeypot" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0" />

                        <div class="mb-4 text-center" v-if="auth.panel == 'login' && settings.password.forgot">
                            <button type="button" class="btn btn-link p-0 text-decoration-none text-nowrap" @click.stop="toggleForgotPassword" v-html="translate(settings.password.forgot)">
                            </button>
                        </div>

                        <div class="d-flex mb-4" v-if="auth.panel == 'forgot' && settings.help && settings.help.forgot">
                            <small class="text-muted" v-html="translate(settings.help.forgot)"></small>
                        </div>

                        <div class="row">
                            <template v-for="(input, key) in settings.inputs" :key="key">
                                <div v-if="input.panels.indexOf(auth.panel) >= 0 && !input.hidden" :class="[input.colclass ? input.colclass : 'col-md-12']">
                                    <div class="mb-3">
                                        <label v-if="input.label" :for="key" class="form-label text-primary" :class="{ 'required': input.required }"
                                            v-html="translate(getValueOrFunction(input.label))"></label>
                                        <div class="input-group">
                                            <span v-if="input.prefix" class="input-group-text" :class="{ 'rounded-bottom-0': input.help }"
                                                v-html="translate(getValueOrFunction(input.prefix))">
                                            </span>

                                            <select v-if="input.type == 'select'" class="form-select" :disabled="loading" :required="input.required" v-model="inputs[key]"
                                                :multiple="input.multiple">
                                                <option></option>
                                                <option v-for="option in input.options" :key="option" :value="option.value" v-html="translate(getValueOrFunction(option.label))">
                                                </option>
                                            </select>

                                            <input v-else :id="key" :name="key" :type="input.type" v-model="inputs[key]" class="form-control"
                                                :class="{ 'rounded-bottom-0': input.help }" :placeholder="translate(input.placeholder)" :required="input.required" :disabled="loading" />

                                            <span v-if="input.suffix" class="input-group-text" :class="{ 'rounded-bottom-0': input.help }"
                                                v-html="translate(getValueOrFunction(input.suffix))"></span>

                                        </div>
                                        <small class="d-block border border-top-0 rounded-bottom p-2 text-muted" v-if="input.help" v-html="translate(getValueOrFunction(input.help))">
                                        </small>
                                    </div>
                                </div>
                            </template>
                        </div>

                        <div v-for="accept in settings.accepts" :key="accept">

                            <div v-if="accept.panels.indexOf(auth.panel) >= 0" class="form-check">
                                <input type="checkbox" class="form-check-input" :id="'accept_' + accept.name" :name="'accept_' + accept.name" v-model="accepts[accept.name]"
                                    :required="accept.required" :disabled="loading" />
                                <label v-if="accept.label" class="form-check-label" :for="'accept_' + accept.name" v-html="translate(getValueOrFunction(accept.label))">
                                </label>
                            </div>

                        </div>


                        <div v-if="auth.panel == 'registration' && settings.help && settings.help.registration" class="mt-4">
                            <div v-html="translate(getValueOrFunction(settings.help.registration))"></div>
                        </div>

                        <div class="mt-3 text-center" v-if="auth.response.message">
                            <div :class="{ 'text-danger': !auth.response.ok, 'text-success': auth.response.ok }" style="white-space: pre-line">{{ translate(auth.response.message) }}</div>
                        </div>

                        <div class="mt-4 d-flex justify-content-between">
                            <button v-if="auth.panel != 'login' && auth.panel != 'activation' && auth.panel != 'profile'" type="button" @click.stop="toggleClear"
                                class="btn btn-secondary w-100 me-2 text-nowrap" :disabled="loading">
                                <i class="bi bi-arrow-left-square mx-1"></i> {{ translate(settings.submit.login) }}
                            </button>
                            <button v-if="auth.panel == 'login' && settings.registrationEnabled !== false" type="button" class="btn btn-warning w-100 me-2 text-nowrap" @click.stop="toggleNewRegistration"
                                :disabled="loading">
                                <i class="bi bi-person-plus mx-1"></i> {{ translate(settings.submit.registration) }}
                            </button>
                            <button type="submit" class="btn w-100 text-nowrap"
                                :class="{ 'btn-primary': auth.panel != 'registration', 'btn-warning': auth.panel == 'registration' }" :disabled="loading">
                                {{ translate(panelText('submit')) }}
                                <i v-if="auth.panel == 'registration'" class="bi bi-person-plus mx-1"></i>
                                <i v-else class="bi bi-arrow-right-square mx-1"></i>
                            </button>
                        </div>


                        <div class="mt-2 text-end">
                            <button type="button" @click.stop="close" class="btn btn-light border w-100 me-1" :disabled="loading">
                                {{ translate(settings.submit.cancel) }} <i class="bi bi-x-square mx-1"></i>
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
    secureRandomInt,
    getResponseJson,
    getResponseErrors,
    isApiResponseOk,
    escapeHtml,
    safeUrl,
} from "./helpers";
import { getLanguage, LANGUAGE_CHANGE_EVENT } from "../i18n.js";
import { effectiveTheme, THEME_CHANGE_EVENT } from "../theme.js";


const eventBus = mitt();

const VuAuth = {
    name: "VuAuth",
    props: {
        modelValue: Object,
    },
    data() {
        return {
            // current UI language, updated by the user menu language switch (re-renders the texts)
            language: getLanguage(),
            theme: "light",
            auth: undefined,
            username: "",
            password: "",
            password_again: "",
            // profile panel: current password (+ its show / hide toggle)
            password_current: "",
            currentPasswordType: "password",
            accepts: {},
            inputs: {},
            honeypot: '',
            twofaCode: '',
            twofaSession: '',
            twofaMethod: '',
            twofaTrustDays: 0,
            twofaTrustMaxDays: null,
            captchaError: false,
            captcha: {
                loading: false,
                items: [],
                question: '',
                label: '',
                request: 0,
                token: '',
                answers: [],
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
        'auth.panel'() {
            if (this.captchaRequired) {
                this.fetchCaptcha();
            }
        },
    },

    computed: {
        // panels with a "new password" field (strength help, length counter, repeat)
        newPasswordPanel() {
            return ['registration', 'password', 'profile'].indexOf(this.auth && this.auth.panel) >= 0;
        },
        captchaRequired() {
            const panel = this.auth && this.auth.panel;
            if (!this.settings || !this.settings.captcha || !this.settings.captcha.panels) return false;
            return this.settings.captcha.panels.includes(panel);
        },
        // settings.twofa.trust.options, without the ones over the server's limit (202 `trustMaxDays`; 0 = none)
        twofaTrustOptions() {
            const trust = this.settings && this.settings.twofa ? this.settings.twofa.trust : null;
            if (!trust || !Array.isArray(trust.options)) return [];
            const max = this.twofaTrustMaxDays;
            if (max === 0) return [];
            const options = trust.options.filter((option) => max == null || Number(option.value) <= max);
            // only "no" left → nothing to choose
            return options.some((option) => Number(option.value) > 0) ? options : [];
        },
        // settings.captcha.question ('Click the <strong>{label}</strong> icon!') is translated, with the translated
        // label of the server; without it (or without a label) the server's question text is shown
        captchaQuestion() {
            const template = this.settings && this.settings.captcha ? this.settings.captcha.question : null;
            if (template && this.captcha.label) {
                // eslint-disable-next-line no-unused-expressions
                this.language;
                // the label comes from the server: escaped, the question template is v-html
                return this.translate(template, { label: escapeHtml(this.translate(this.captcha.label)) });
            }
            return this.captcha.question;
        },
    },


    methods: {
        safeUrl,

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
                // remove X-Auth-Role stored by an earlier version unless opted in
                if (this.auth.roleHeader !== 'X-Auth-Role') {
                    delete this.auth.header['X-Auth-Role'];
                }
            }

            if (typeof settings === 'string' && settings && settings[0] === '{') {
                this.auth.settings = JSON.parse(settings);
            }

            if (!this.auth.user || !this.auth.header) {
                this.logout();
            } else if (this.settings.api && this.settings.api.profile) {
                this.loadProfile();
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

                await this.getStatusAndJson(response);

                if (this.auth.response.ok) {
                    if (this.settings.onSuccess && this.settings.onSuccess.profile) {
                        this.settings.onSuccess.profile(this.auth);
                    } else {
                        Object.assign(this.auth.user, this.auth.response.data);
                    }
                    this.auth.success = true;
                    localStorage.setItem('vu-user', JSON.stringify(this.auth.user));
                    if (this.auth.settings) {
                        localStorage.setItem('vu-settings', JSON.stringify(this.auth.settings));
                    }
                    this.authUpdate();
                } else {
                    this.logout();
                }

            } catch (error) {
                this.logout();
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
            this.password_current = "";
            this.currentPasswordType = "password";
            this.twofaCode = "";
            this.twofaSession = "";
            this.twofaMethod = "";
            this.twofaTrustDays = 0;
            this.twofaTrustMaxDays = null;
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
            this.auth.response.code = response ? response.status : 0;

            const json = await getResponseJson(response);
            this.auth.response.data = json.data ?? null;

            const errors = getResponseErrors(response, json);
            const ok = isApiResponseOk(response, json);
            this.auth.response.ok = ok;

            if (!ok) {
                if (json.error && (this.auth.response.data == null || typeof this.auth.response.data !== 'object')) {
                    this.auth.response.data = {
                        ok: false,
                        errors: { server: json.error.message || String(json.error) },
                    };
                }
                if (!this.auth.response.message && errors?.length) {
                    this.auth.response.message = errors.map((e) => e.message).join('\n');
                }
            }

            return ok;
        },

        onSuccess(panel) {

            this.auth.response.ok = true;

            if (this.settings.onSuccess && this.settings.onSuccess[panel]) {
                this.settings.onSuccess[panel](this.auth);

                if (!this.auth.header) {
                    this.auth.header = {};
                }

                if (!this.auth.user.role && this.auth.user.roles) {
                    this.auth.user.role = this.auth.user.roles[0];
                }

                // the role header is opt-in only (settings.roleHeader); the backend must not trust it,
                // it may only select one of the token's roles with it
                if (this.auth.roleHeader && this.auth.user.role) {
                    this.auth.header[this.auth.roleHeader] = this.auth.user.role;
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

            if (!this.auth.response.message) {
                const errors = getResponseErrors(
                    { status: this.auth.response.code || 400 },
                    this.auth.response.data
                );
                if (errors?.length) {
                    this.auth.response.message = errors.map((e) => e.message).join('\n');
                }
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
            // Honeypot check — skip for twofa (no honeypot field on that panel)
            if (this.auth.panel !== 'twofa' && this.honeypot) {
                return;
            }

            // Captcha check — exactly 1 icon selected
            if (this.captchaRequired) {
                if (this.captcha.answers.length !== 1) {
                    this.captchaError = true;
                    return;
                }
            }

            this.captchaError = false;
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
                    case 'twofa':
                        await this.handleTwofaSubmit();
                        break;
                    case 'activation':
                        await this.handleActivationSubmit();
                        break;
                    case 'password':
                        await this.handlePasswordSubmit();
                        break;
                    case 'profile':
                        await this.handleProfilePasswordSubmit();
                        break;
                }
            } catch (e) {
                console.error('[auth] submit error', e);
            } finally {
                this.loading = false;
                if (this.captchaRequired && this.auth.panel !== 'twofa') this.fetchCaptcha();
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
                    honeypot: this.honeypot,
                    captchaToken: this.captcha.token,
                    captchaAnswer: this.captcha.answers,
                }),
            });

            await this.getStatusAndJson(response);

            if (response.status === 202 && this.isTwofaPanel('login')) {
                this.twofaSession = this.auth.response.data.twofaSession;
                this.twofaMethod = this.auth.response.data.twofa;
                const maxDays = this.auth.response.data.trustMaxDays;
                this.twofaTrustMaxDays = Number.isFinite(Number(maxDays)) && maxDays !== null && maxDays !== undefined ? Number(maxDays) : null;
                this.twofaTrustDays = this.settings.twofa && this.settings.twofa.trust && this.settings.twofa.trust.default
                    ? Number(this.settings.twofa.trust.default) : 0;
                if (this.twofaTrustMaxDays !== null && this.twofaTrustDays > this.twofaTrustMaxDays) {
                    this.twofaTrustDays = 0;
                }
                this.auth.panel = 'twofa';
                return;
            }

            if (this.auth.response.ok) {
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
                    honeypot: this.honeypot,
                    captchaToken: this.captcha.token,
                    captchaAnswer: this.captcha.answers,
                }),
            });

            await this.getStatusAndJson(response);

            if (this.auth.response.ok) {
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

            if (this.auth.response.ok) {
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
                        honeypot: this.honeypot,
                        captchaToken: this.captcha.token,
                        captchaAnswer: this.captcha.answers,
                    }),
                });

                await this.getStatusAndJson(response);

                if (this.auth.response.ok) {
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

                if (this.auth.response.ok) {
                    this.onPasswordUpdate('password');
                } else {
                    this.onError('password');
                }
            } catch (error) {
                this.onError('password');
            }
        },

        // title / submit text of the current panel: settings.title / settings.submit, built-in default for 'profile'
        panelText(kind) {
            const texts = this.settings[kind] || {};
            if (texts[this.auth.panel]) {
                return texts[this.auth.panel];
            }
            const defaults = { title: { profile: 'Profile' }, submit: { profile: 'Save password' } };
            return (defaults[kind] && defaults[kind][this.auth.panel]) || '';
        },

        // profile panel: password change of the signed-in user
        // POST settings.api.changePassword (default /api/auth/password) with the login header,
        // body { currentPassword, password } (both hashed like at sign-in: settings.password.hash)
        // the answer's `message` is shown; an error here never signs the user out
        async handleProfilePasswordSubmit() {
            this.auth.response = {};

            if (!this.password_current || !this.password || this.password !== this.password_again) {
                return;
            }

            const url = (this.settings.api && this.settings.api.changePassword) || '/api/auth/password';

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: Object.assign({ 'Content-Type': 'application/json' }, this.auth.header || {}),
                    body: JSON.stringify({
                        currentPassword: await this.hashPassword(this.password_current),
                        password: await this.hashPassword(this.password),
                    }),
                });

                await this.getStatusAndJson(response);
            } catch (error) {
                this.auth.response = { ok: false, message: 'Network error' };
                return;
            }

            const data = this.auth.response.data || {};
            if (this.auth.response.ok) {
                this.auth.response.message = data.message || 'Password changed';
                this.password_current = '';
                this.password = '';
                this.password_again = '';
                if (this.settings.onSuccess && this.settings.onSuccess.changePassword) {
                    this.settings.onSuccess.changePassword(this.auth);
                }
            } else {
                this.auth.response.message = data.message || 'Password update failed!';
                if (this.settings.onError && this.settings.onError.changePassword) {
                    this.settings.onError.changePassword(this.auth);
                }
            }
        },

        async handleTwofaSubmit() {
            this.auth.response = {};

            const response = await fetch(this.settings.api.twofa, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // the trust cookie (HttpOnly) is set by the server on this answer; same-origin fetch stores it
                body: JSON.stringify({
                    twofaSession: this.twofaSession,
                    code: this.twofaCode,
                    trustDays: this.twofaTrustOptions.length ? this.twofaTrustDays : 0,
                }),
            });

            await this.getStatusAndJson(response);

            if (this.auth.response.ok) {
                this.onSuccess('login');
                this.close();
            } else if (response.status === 401) {
                this.twofaExpired();
            } else {
                this.twofaCode = '';
                this.onError('twofa');
            }
        },

        async resendTwofa() {
            if (!this.settings.api.twofaResend) return;

            this.loading = true;
            this.auth.response = {};

            try {
                const response = await fetch(this.settings.api.twofaResend, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ twofaSession: this.twofaSession }),
                });
                await this.getStatusAndJson(response);
                if (this.auth.response.ok) {
                    this.twofaCode = '';
                    this.auth.response.message = this.auth.response.data?.message || '';
                    this.$forceUpdate();
                } else if (response.status === 401) {
                    this.twofaExpired();
                } else {
                    this.onError('twofa');
                }
            } catch (e) {
                console.error('[auth] resend twofa error', e);
            } finally {
                this.loading = false;
            }
        },

        // 401 on the twofa panel: the 2FA session is gone (expired, too many wrong codes / resends) →
        // back to the login panel, keeping the server message
        twofaExpired() {
            this.onError('twofa');
            this.auth.response.ok = false;
            this.twofaCode = '';
            this.twofaSession = '';
            this.twofaMethod = '';
            this.password = '';
            this.auth.panel = 'login';
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

        // config texts are translation keys: auth settings translate → window.VuSettings.translate → built-in
        translate(key, vars, language) {
            if (typeof key !== 'string') {
                return key;
            }
            return translate(key, this.settings.translate, vars, language || this.settings.language || this.language);
        },

        isTwofaPanel(panel) {
            if (!this.settings.twofa || !this.settings.twofa.panels) return true;
            return this.settings.twofa.panels.includes(panel);
        },

        async fetchCaptcha() {
            if (!this.settings.captcha || !this.settings.captcha.url) return;
            // only the latest request applies (a submit and a panel switch can both ask for a new challenge)
            const request = ++this.captcha.request;
            this.captcha.loading = true;
            this.captcha.answers = [];
            this.captchaError = false;
            try {
                const res = await fetch(this.settings.captcha.url, { cache: 'no-store' });
                const data = await res.json();
                if (request !== this.captcha.request) return;
                const ok = res.ok && data && Array.isArray(data.items);
                this.captcha.items = ok ? data.items : [];
                this.captcha.question = ok ? (data.question || '') : '';
                this.captcha.label = ok ? (data.label || '') : '';
                this.captcha.token = ok ? (data.token || '') : '';
                if (!ok) {
                    console.error('[captcha] load failed', res.status, data);
                }
            } catch (e) {
                if (request === this.captcha.request) {
                    this.captcha.items = [];
                    this.captcha.token = '';
                }
                console.error('[captcha] load failed', e);
            } finally {
                if (request === this.captcha.request) {
                    this.captcha.loading = false;
                }
            }
        },

        toggleCaptchaAnswer(id) {
            const idx = this.captcha.answers.indexOf(id);
            if (idx >= 0) {
                this.captcha.answers.splice(idx, 1);
            } else {
                this.captcha.answers = [id];
            }
        },

    },

    created() {
        if (window.VuSettings && window.VuSettings.auth) {
            this.settings = window.VuSettings.auth;
        }
        // the user's choice (theme switch) wins over window.VuSettings.theme
        this.theme = effectiveTheme(window.VuSettings && window.VuSettings.theme);

        let uid = secureRandomInt(100000);

        this.formId = "form_profil_" + uid;
        this.modalId = "modal_profil_" + uid;

    },
    mounted() {

        window.addEventListener("keydown", this.handleEscapeKey);

        this._onLanguageChange = (event) => {
            this.language = event.detail.language;
        };
        window.addEventListener(LANGUAGE_CHANGE_EVENT, this._onLanguageChange);

        this._onThemeChange = () => {
            this.theme = effectiveTheme(window.VuSettings && window.VuSettings.theme);
        };
        window.addEventListener(THEME_CHANGE_EVENT, this._onThemeChange);

        // Load the reCAPTCHA script if it is not available yet
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

        this.auth.roleHeader = this.settings.roleHeader || null;

        this.checkStorage();
        this.reset();
        this.updateInputs();
        this.$forceUpdate();
        this.detectQuery();
        if (this.captchaRequired) this.fetchCaptcha();

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
        window.removeEventListener(LANGUAGE_CHANGE_EVENT, this._onLanguageChange);
        window.removeEventListener(THEME_CHANGE_EVENT, this._onThemeChange);
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

    @media (max-width: 575.98px) {
        .modal .modal-dialog {
            width: 100%;
            max-width: 100%;
            height: 100%;
            max-height: 100%;
            margin: 0;
        }

        .modal .modal-content {
            height: 100%;
            max-height: 100%;
            border-radius: 0;
        }

        .modal-header {
            flex-wrap: wrap;
            row-gap: 0.5rem;
        }
    }

}
</style>