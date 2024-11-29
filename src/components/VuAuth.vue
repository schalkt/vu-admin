<template>

    <div v-if="auth && auth.visible" class="vua-auth">
        <div class="row d-flex justify-content-center align-items-center min-vh-100" @click.stop="close">
            <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
                <div class="card shadow p-4 position-relative bg-light" @click.stop="">

                    <button type="button" class="btn position-absolute top-0 end-0 p-0 m-2" @click.stop="close">
                        <i class="bi bi-x px-1 text-muted"></i>
                    </button>

                    <h1 class="text-center mt-2 mb-4">

                        <span v-if="auth.panel == 'forgot'">
                            Elfelejtett jelszó
                        </span>
                        <span v-if="auth.panel == 'registration'">
                            Regisztráció
                        </span>
                        <span v-if="auth.panel == 'help'">
                            Segítség
                        </span>
                        <span v-if="auth.panel == 'login'">
                            Bejelentkezés
                        </span>
                    </h1>

                    <div v-if="auth.panel == 'help'">
                        <div v-html="settings.help" class="mb-4"></div>
                        <div class="d-flex justify-content-between">
                            <button v-if="auth.panel != 'login'" type="button" @click.stop="toggleClear" class="btn btn-secondary w-100 me-1">
                                <i class="bi bi-arrow-left-square mx-1"></i> Vissza
                            </button>
                        </div>
                    </div>

                    <form v-else @submit.prevent="handleSubmit()" @click.stop="">
                        <!-- E-mail mező -->
                        <div class="mb-3">
                            <label for="email" class="form-label text-primary">{{ settings.username.label }}</label>
                            <div class="input-group">
                                <span v-if="settings.username.icon" class="input-group-text" :class="{ 'rounded-bottom-0': settings.username.help }">
                                    <i :class="[settings.username.icon]"></i>
                                </span>
                                <input id="email" name="email" :type="settings.username.type" v-model="username" class="form-control"
                                    :class="{ 'rounded-bottom-0': settings.username.help }" :placeholder="settings.username.placeholder" required />
                            </div>
                            <small class="d-block border border-top-0 rounded-bottom bg-light p-2 text-muted" v-if="settings.username.help" v-html="settings.username.help"></small>
                        </div>

                        <!-- Jelszó mező és Elfelejtett jelszó gomb -->
                        <template v-if="auth.panel != 'forgot'">

                            <div class="mb-3">
                                <label for="password" class="form-label text-primary">
                                    {{ settings.password.label }}
                                </label>
                                <div class="input-group">
                                    <span v-if="settings.password.icon" class="input-group-text"
                                        :class="{ 'rounded-bottom-0': auth.panel == 'registration' && settings.password.help }">
                                        <i :class="[settings.password.icon]"></i>
                                    </span>
                                    <input id="password" name="password" :type="settings.password.type" v-model="password" class="form-control"
                                        :class="{ 'rounded-bottom-0': auth.panel == 'registration' && settings.password.help }" :placeholder="settings.password.placeholder"
                                        :pattern="settings.password.pattern" :minlength="auth.panel == 'registration' ? settings.password.minlength : 1" required />
                                    <span v-if="auth.panel == 'registration'" class="input-group-text"
                                        :class="{ 'rounded-bottom-0': auth.panel == 'registration' && settings.password.help }">
                                        <small class="" :class="{
                                            'text-success': password.length >= settings.password.minlength,
                                            'text-danger': password.length < settings.password.minlength,
                                        }">{{ password.length }}</small>
                                    </span>
                                    <span class="cursor-pointer input-group-text" @click.stop="toggleType('password')"
                                        :class="{ 'rounded-bottom-0': auth.panel == 'registration' && settings.password.help }">
                                        <i v-if="settings.password.type == 'password'" class="bi bi-eye"></i>
                                        <i v-else class="bi bi-eye-slash"></i>
                                    </span>
                                </div>
                                <small class="d-block border border-top-0 rounded-bottom bg-light p-2 text-muted" v-if="auth.panel == 'registration' && settings.password.help"
                                    v-html="settings.password.help"></small>
                            </div>

                            <div class="mb-4" v-if="auth.panel === 'registration'">
                                <label for="password_again" class="form-label text-primary">
                                    {{ settings.password_again.label }}
                                    <small v-if="password_again.length > 0 && password_again != password" class="text-danger">
                                        ( a két jelszó nem egyezik )
                                    </small>
                                </label>
                                <div class="input-group">
                                    <span v-if="settings.password.icon" class="input-group-text" :class="{ 'rounded-bottom-0': settings.password_again.help }">
                                        <i :class="[settings.password_again.icon]"></i>
                                    </span>
                                    <input id="password_again" name="password_again" :type="settings.password_again.type" v-model="password_again" class="form-control"
                                        :class="{ 'rounded-bottom-0': settings.password_again.help }" :placeholder="settings.password_again.placeholder"
                                        :minlength="settings.password.minlength" required />
                                    <span class="input-group-text" :class="{ 'rounded-bottom-0': settings.password_again.help }">
                                        <small class="" :class="{
                                            'text-success': password_again.length >= settings.password.minlength,
                                            'text-danger': password_again.length < settings.password.minlength,
                                        }">{{ password_again.length }}</small>
                                    </span>
                                    <span class="cursor-pointer input-group-text" @click.stop="toggleType('password_again')"
                                        :class="{ 'rounded-bottom-0': auth.panel == 'registration' && settings.password_again.help }">
                                        <i v-if="settings.password_again.type == 'password'" class="bi bi-eye"></i>
                                        <i v-else class="bi bi-eye-slash"></i>
                                    </span>
                                </div>
                                <small class="d-block border border-top-0 rounded-bottom bg-light p-2 text-muted"
                                    v-if="auth.panel == 'registration' && settings.password_again.help" v-html="settings.password_again.help"></small>
                            </div>

                            <!-- reCAPTCHA -->
                            <div class="mb-3 text-center">
                                <div class="g-recaptcha" :data-sitekey="recaptchaSiteKey" @click.stop="onCaptchaClick"></div>
                            </div>
                        </template>

                        <div class="mb-4 text-center" v-if="auth.panel == 'login'">
                            <button type="button" class="btn btn-link p-0 text-decoration-none text-nowrap" @click.stop="toggleForgotPassword">
                                Elfelejtetted a jelszavad?
                            </button>
                            <button v-if="settings.help" type="button" class="btn btn-link p-0 text-decoration-none text-nowrap" @click.stop="toggleHelp">
                                Segítségre van szükséged?
                            </button>
                        </div>

                        <div class="d-flex mb-4" v-if="auth.panel == 'forgot'">
                            <small class="text-muted">
                                A megadott e-mail címre ( amennyiben az szerepel az adatbázisunkban ) egy levelet küldünk,
                                melyben az új jelszó igénylése linkre kattintva egy weboldalra jutsz.
                                Ott tudod megadni az új jelszavadat. Az e-mailben szereplő link csak 1 óráig érvényes.
                            </small>
                        </div>


                        <div v-if="auth.panel == 'registration'">
                            <div v-for="input in settings.inputs" :key="input" class="mb-4">

                                <label :for="input.name" class="form-label text-primary" v-html="getValueOrFunction(input.label)"></label>
                                <div class="input-group">
                                    <span v-if="input.prefix" class="input-group-text" :class="{ 'rounded-bottom-0': input.help }" v-html="getValueOrFunction(input.prefix)"> </span>

                                    <select v-if="input.type == 'select'" class="form-select" :required="input.required" v-model="inputs[input.name]" :multiple="input.multiple">
                                        <option></option>
                                        <option v-for="option in input.options" :key="option" :value="option.value" v-html="getValueOrFunction(option.label)">                                            
                                        </option>
                                    </select>

                                    <input v-else :id="input.name" :name="input.name" :type="input.type" v-model="inputs[input.name]" class="form-control"
                                        :class="{ 'rounded-bottom-0': input.help }" :placeholder="input.placeholder" :required="input.required" />

                                    <span v-if="input.suffix" class="input-group-text" :class="{ 'rounded-bottom-0': input.help }" v-html="getValueOrFunction(input.suffix)"></span>

                                </div>
                                <small class="d-block border border-top-0 rounded-bottom bg-light p-2 text-muted" v-if="input.help" v-html="getValueOrFunction(input.help)">
                                </small>

                            </div>
                        </div>


                        <div v-for="accept in settings.accepts" :key="accept">

                            <div v-if="accept.panels.indexOf(auth.panel) >= 0" class="form-check">
                                <input type="checkbox" class="form-check-input" :id="'accept_' + accept.name" :name="'accept_' + accept.name" v-model="accepts[accept.name]"
                                    :required="accept.required" />
                                <label class="form-check-label" :for="'accept_' + accept.name" v-html="getValueOrFunction(accept.label)">
                                </label>
                            </div>

                        </div>


                        <div v-if="auth.panel == 'registration' && settings.registration" class="mt-4">
                            <div v-if="settings.registration.help" v-html="getValueOrFunction(settings.registration.help)"></div>
                        </div>


                        <div class="mt-4 d-flex justify-content-between">
                            <button v-if="auth.panel != 'login'" type="button" @click.stop="toggleClear" class="btn btn-secondary w-100 me-2 text-nowrap">
                                <i class="bi bi-arrow-left-square mx-1"></i> Bejelentkezés
                            </button>
                            <button v-if="auth.panel == 'login'" type="button" class="btn btn-warning w-100 me-2 text-nowrap" @click.stop="toggleNewRegistration">
                                <i class="bi bi-person-plus mx-1"></i> Regisztráció
                            </button>
                            <button type="submit" class="btn w-100 text-nowrap"
                                :class="{ 'btn-primary': auth.panel != 'registration', 'btn-warning': auth.panel == 'registration' }">
                                {{ auth.panel == 'forgot' ? 'Új jelszó kérése' : (auth.panel == 'registration' ? 'Regisztráció' : 'Bejelentkezés') }}
                                <i v-if="auth.panel == 'registration'" class="bi bi-person-plus mx-1"></i>
                                <i v-else class="bi bi-arrow-right-square mx-1"></i>
                            </button>
                        </div>

                        <div class="mt-3 text-center" v-if="responseMessage">
                            <div :class="{ 'text-danger': !responseOk, 'text-success': responseOk }" v-html="responseMessage"></div>
                        </div>

                        <div class="mt-2 text-end">
                            <button type="button" @click.stop="close" class="btn btn-light border w-100 me-1">
                                <i class="bi bi-x-square mx-1"></i> Mégsem
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    </div>
</template>

<script>

import mitt from 'mitt';
import { sha384 } from 'crypto-hash';
import {
    getValueOrFunction,
} from "./helpers";

const eventBus = mitt();

const VuAuth = {
    name: "VuAuth",
    props: {
        modelValue: Object,
        api_login: String,
        api_register: String,
        api_password: String,
        settings: Object
    },
    data() {
        return {
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
            }
        };
    },
    watch: {
        modelValue(newValue, oldValue) {
            if (newValue != oldValue) {
                this.auth = newValue;
                this.$forceUpdate();
            }
        },
    },
    methods: {

        checkStorage() {

            this.auth.user = {};
            // this.auth.token = localStorage.getItem('vu-token');
            this.auth.user = JSON.parse(localStorage.getItem('vu-user'));
            this.auth.header = JSON.parse(localStorage.getItem('vu-header'));

            if (this.auth.user) {
                this.auth.success = true;
            }

            this.$emit("update:modelValue", this.auth);

        },

        async handleSubmit() {

            if (this.auth.panel == 'login') {
                this.handleLogin();
                return;
            }

            if (this.auth.panel == 'forgot') {
                this.handleForgotPasswordSubmit();
                return;
            }

            if (this.auth.panel == 'registration') {
                this.handleNewRegistrationSubmit();
                return;
            }

        },

        async handleLogin() {

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
            }
            );

            if (response.ok) {

                const responseData = await response.json();

                this.responseOk = true;
                this.responseMessage = 'Sikeres bejelentkezés';
                this.login(responseData);
                this.close();


            } else {
                this.responseOk = false;
                this.auth.success = false;
                this.responseMessage = 'Sikertelen bejelentkezés';
            }

        },

        async handleNewRegistrationSubmit() {

            if (!this.username || !this.password || !this.password_again) {
                return;
            }

            if (this.password != this.password_again) {
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

            if (response.ok) {

                const responseData = await response.json();
                this.responseOk = true;
                this.responseMessage = 'Sikeres regisztráció';


            } else {
                this.responseOk = false;
                this.responseMessage = 'Sikertelen regisztráció';
            }



        },

        handleForgotPasswordSubmit() {
            // Elfelejtett jelszó logika
            console.log("Elfelejtett jelszó e-mail beküldve:", this.email);
            alert("E-mail elküldve a megadott címre!");

            this.reset();
        },

        async hashPassword(password) {

            this.settings.password.hash = this.settings.password.hash === undefined ? 0 : this.settings.password.hash;
            let password_hashed = password;

            for (let i = 0; i < this.settings.password.hash; i++) {
                password_hashed = await sha384(password_hashed);
            }

            return password_hashed;

        },

        reset() {

            this.password = "";
            this.password_again = "";
            this.responseMessage = "";
            this.responseOk = false;

        },

        close() {
            this.auth.visible = false;
            this.$emit("update:modelValue", this.auth);
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

        toggleHelp() {
            this.auth.panel = this.auth.panel !== 'help' ? 'help' : 'login';
            this.reset();
        },

        toggleType(field) {
            this.settings[field].type = this.settings[field].type != 'password' ? 'password' : 'text';
            this.$forceUpdate();
        },

        onCaptchaClick() {
            // reCAPTCHA validálás
            console.log("reCAPTCHA clicked");
        },

        authUpdate() {
            this.$emit("update:modelValue", this.auth);
        },

        handleEscapeKey(event) {
            if (event.key === "Escape") {
                this.close();
            }
        },

        login(responseData) {

            if (this.settings.onsuccess) {
                this.settings.onsuccess(responseData, this.auth);
                // localStorage.setItem('vu-token', this.auth.token);
                localStorage.setItem('vu-user', JSON.stringify(this.auth.user));
                localStorage.setItem('vu-header', JSON.stringify(this.auth.header));
            }

            this.auth.success = true;

            setTimeout(() => {
                this.authUpdate(responseData);
                this.$forceUpdate();
            }, 0)

        },

        logout() {
            this.auth.success = false;
            this.auth.header = null;
            this.auth.user = null;
            this.$emit("update:modelValue", this.auth);

            localStorage.removeItem('vu-user');
            localStorage.removeItem('vu-header');

        },

        getValueOrFunction(object, params) {
            return getValueOrFunction(object, params, this.settings, this);
        },

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
                success: false,
            };
            this.authUpdate();
        }

        this.checkStorage();
        this.reset();

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
    background-color: rgba(242, 242, 242, 0.95);
    z-index: 99999;

    .cursor-pointer {
        cursor: pointer;
    }

    .container {
        background-color: #f8f9fa;
    }

    .card {

        border-radius: 8px;
        max-height: 100vh;
        overflow-y: auto;

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