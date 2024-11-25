<template>

    <div v-if="auth && auth.visible" class="vua-auth position-fixed">
        <div class="d-flex justify-content-center align-items-center min-vh-100" @click.stop="close">
            <div class="card shadow p-4 position-relative" :style="{ 'max-width': (settings.maxwidth ? settings.maxwidth : 400) + 'px' }" _style="width: 100%;">

                <button type="button" class="btn btn- position-absolute top-0 end-0 p-0 m-2 bg-light" @click.stop="close">
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
                        <label for="username" class="form-label text-primary">{{ settings.username.label }}</label>
                        <div class="input-group">
                            <span v-if="settings.username.icon" class="input-group-text rounded-bottom-0">
                                <i :class="[settings.username.icon]"></i>
                            </span>
                            <input id="username" :type="settings.username.type" v-model="username" class="form-control rounded-bottom-0"
                                :placeholder="settings.username.placeholder" required />
                        </div>
                        <small class="d-block border border-top-0 rounded-bottom bg-light p-2 text-muted" v-if="settings.username.help" v-html="settings.username.help"></small>
                    </div>

                    <!-- Jelszó mező és Elfelejtett jelszó gomb -->
                    <template v-if="auth.panel != 'forgot'">

                        <div class="mb-3">
                            <label for="password" class="form-label text-primary">Jelszó</label>
                            <div class="input-group">
                                <span v-if="settings.password.icon" class="input-group-text"
                                    :class="{'rounded-bottom-0' : auth.panel == 'registration'}">
                                    <i :class="[settings.password.icon]"></i>
                                </span>
                                <input id="password" type="password" v-model="password" class="form-control" 
                                    :class="{'rounded-bottom-0' : auth.panel == 'registration'}"
                                    placeholder="Add meg a jelszavad" minlength="8"
                                    required />
                            </div>
                            <small class="d-block border border-top-0 rounded-bottom bg-light p-2 text-muted"                                 
                                v-if="auth.panel == 'registration' && settings.password.help" v-html="settings.password.help"></small>
                        </div>

                        <div class="mb-4" v-if="auth.panel === 'registration'">
                            <label for="password_again" class="form-label text-primary">Jelszó ismét</label>
                            <div class="input-group">
                                <span v-if="settings.password.icon" class="input-group-text">
                                    <i :class="[settings.password.icon]"></i>
                                </span>
                                <input id="password_again" type="password" v-model="password_again" class="form-control" placeholder="Ismételd meg a jelszavad" minlength="8"
                                    required />
                            </div>
                        </div>

                        <!-- reCAPTCHA -->
                        <div class="mb-3 text-center">
                            <div class="g-recaptcha" :data-sitekey="recaptchaSiteKey" @click.stop="onCaptchaClick"></div>
                        </div>
                    </template>

                    <div class="mb-3 text-center" v-if="auth.panel == 'login'">
                        <button type="button" class="btn btn-link p-0 text-decoration-none" @click.stop="toggleForgotPassword">
                            Elfelejtetted a jelszavad?
                        </button>
                        <button v-if="settings.help" type="button" class="btn btn-link p-0 text-decoration-none" @click.stop="toggleHelp">
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

                    <!-- Beküldés gomb -->
                    <div class="d-flex justify-content-between">
                        <button v-if="auth.panel != 'login'" type="button" @click.stop="toggleClear" class="btn btn-secondary w-100 me-2">
                            <i class="bi bi-arrow-left-square mx-1"></i> Bejelentkezés
                        </button>
                        <button v-if="auth.panel == 'login'" type="button" class="btn btn-warning w-100 me-2" @click.stop="toggleNewRegistration">
                            <i class="bi bi-person-plus mx-1"></i> Regisztráció
                        </button>
                        <button type="submit" class="btn w-100" :class="{'btn-primary' : auth.panel != 'registration', 'btn-warning': auth.panel == 'registration'}">
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
</template>

<script>

import mitt from 'mitt';
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
        modelValue(newValue) {
            this.auth = newValue;
        },
    },
    methods: {

        checkStorage() {

            this.auth.user = {};
            this.auth.token = localStorage.getItem('vu-token');
            this.auth.user = JSON.parse(localStorage.getItem('vu-user'));
            this.$emit("update:modelValue", this.auth);

        },

        async handleSubmit() {

            if (this.auth.panel == 'forgot') {
                this.handleForgotPasswordSubmit();
            }

            if (this.auth.panel == 'registraton') {
                this.handleNewRegistrationSubmit();
            }

            this.handleLogin();

        },

        async handleLogin() {

            if (!this.username || !this.password) {
                return;
            }

            const response = await fetch(
                this.settings.api.login,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password,
                    }),
                }
            );

            if (response.ok) {

                const responseData = await response.json();
                this.userUpdate(responseData);

                this.responseOk = true;
                this.responseMessage = 'Sikeres bejelentkezés';

                if (this.settings.onsuccess) {

                    localStorage.setItem('vu-token', responseData.accessToken);
                    localStorage.setItem('vu-user', JSON.stringify(responseData));
                    this.settings.onsuccess(responseData);
                }

                this.close();

            } else {
                this.responseOk = false;
                this.responseMessage = 'Sikertelen bejelentkezés';
            }

        },

        handleForgotPasswordSubmit() {
            // Elfelejtett jelszó logika
            console.log("Elfelejtett jelszó e-mail beküldve:", this.email);
            alert("E-mail elküldve a megadott címre!");

            this.reset();
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

        onCaptchaClick() {
            // reCAPTCHA validálás
            console.log("reCAPTCHA clicked");
        },

        userUpdate(userData) {

            this.auth.user = userData;
            this.$emit("update:modelValue", this.auth);
        },

        handleEscapeKey(event) {
            if (event.key === "Escape") {
                this.close(); 
            }
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

        console.log(this.settings);
        
        if (!this.auth) {
            this.auth = {
                user: undefined,
                success: false
            };
        }

        this.userUpdate();
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

<style lang="scss" scoped>
.position-fixed {
    inset: 0px;
    background-color: rgba(242, 242, 242, 0.95);
    z-index: 99999;
}

.container {
    background-color: #f8f9fa;
}

.card {
    border-radius: 8px;

    input {

        font-weight: bold;

        &::placeholder {
            font-weight: lighter;
            opacity: 0.5;
        }

    }
}
</style>