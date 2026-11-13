<template>

    <div v-if="(panel != 'registration' || registrationEnabled) && ((!auth.user && panel != 'login') || panel == 'login')" class="vua-user-button d-inline-block" :data-bs-theme="[theme]">
        <div v-if="auth.user" class="dropdown">
            <button class="dropdown-toggle" :class="[settings.class]" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <span v-html="translate(getValueOrFunction(settings.label))"></span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">

                <template v-for="dropdown in visibleDropdowns" :key="dropdown">
                    <li v-if="dropdown.action == 'BUTTON_ROLES'" :class="[dropdown.class]" class="d-flex items-align-center">
                        <span v-html="translate(getValueOrFunction(dropdown.label))" class="me-2"></span>
                        <button v-for="role in auth.user.roles" :key="role" @click="setSelectedRole(role)"                                
                                class="btn btn-sm btn-secondary p-0 px-1 me-1"
                                :class="{'bg-primary text-light' : role == auth.user.role}">
                            {{ role }}
                        </button>
                    </li>
                    <li v-else-if="dropdown.action == 'BUTTON_LANGUAGE'" :class="[dropdown.class]" class="d-flex align-items-center">
                        <span v-html="translate(getValueOrFunction(dropdown.label !== undefined ? dropdown.label : 'Language'))" class="me-2"></span>
                        <button v-for="item in languages(dropdown)" :key="item.value" type="button" @click.stop="changeLanguage(item.value)"
                                class="btn btn-sm btn-secondary p-0 px-1 me-1"
                                :class="{ 'bg-primary text-light': item.value == language }" :title="item.label">
                            {{ item.short || item.value.toUpperCase() }}
                        </button>
                    </li>
                    <li v-else-if="dropdown.action == 'BUTTON_THEME'" :class="[dropdown.class]" class="d-flex align-items-center">
                        <span v-html="translate(getValueOrFunction(dropdown.label !== undefined ? dropdown.label : 'Theme'))" class="me-2"></span>
                        <button v-for="item in themes(dropdown)" :key="item.value" type="button" @click.stop="changeTheme(item.value)"
                                class="btn btn-sm btn-secondary p-0 px-1 me-1"
                                :class="{ 'bg-primary text-light': item.value == themeChoice }" :title="translate(item.label)" :aria-label="translate(item.label)">
                            <i v-if="item.icon" :class="item.icon"></i>
                            <span v-else>{{ translate(item.label) }}</span>
                        </button>
                    </li>
                    <!-- built-in "Profile" item: hidden when window.VuSettings.auth.profile.enabled === false -->
                    <li v-else-if="dropdown.action == 'BUTTON_PROFILE'" :class="[dropdown.class]" @click="showProfilModal()">
                        <span v-if="dropdown.label !== undefined" v-html="translate(getValueOrFunction(dropdown.label))"></span>
                        <template v-else><i class="bi bi-person me-1"></i> {{ translate('Profile') }}</template>
                    </li>
                    <li v-else :class="[dropdown.class]" @click="dropdownAction(dropdown)" v-html="translate(getValueOrFunction(dropdown.label))"></li>

                </template>
            </ul>
        </div>
        <div v-else class="d-inline-block">
            <button :class="[settings.class]" type="button" @click="togglePanel">
                <i v-if="settings.icon" :class="[settings.icon]"></i>
                <span v-html="translate(getValueOrFunction(settings.label))"></span>
            </button>
        </div>
    </div>

</template>

<script>

import {
    getValueOrFunction,
    translate,
} from "./helpers";
import { getLanguage, setLanguage, availableLanguages, LANGUAGE_CHANGE_EVENT } from "../i18n.js";
import { getTheme, setTheme, availableThemes, effectiveTheme, THEME_CHANGE_EVENT } from "../theme.js";

const VuUserButton = {
    name: "VuUserButton",
    props: {
        modelValue: Object,
        panel: String
    },
    data() {
        return {
            theme: "light",
            auth: {},
            settings: {},
            registrationEnabled: true,
            language: getLanguage(),
            // the user's theme choice ('light' | 'dark' | 'auto' | null), highlighted in BUTTON_THEME
            themeChoice: getTheme(),
        }
    },
    watch: {
        // immediate: an auth object that is ready at mount (e.g. VuAdminApp `session`) shows the user menu at once
        modelValue: {
            immediate: true,
            handler(newValue, oldValue) {

                if (newValue && newValue != oldValue) {
                    this.auth = newValue;
                    if (oldValue !== undefined) {
                        this.$forceUpdate();
                    }
                }

            },
        },
    },
    computed: {
        // window.VuSettings.auth.profile.enabled: false → no "Profile" item / profile panel (default: enabled)
        profileEnabled() {
            const auth = window.VuSettings && window.VuSettings.auth;
            return !(auth && auth.profile && auth.profile.enabled === false);
        },
        // dropdown items without `hidden` (true or a function returning true) and without a disabled profile item
        visibleDropdowns() {
            const dropdowns = Array.isArray(this.settings.dropdowns) ? this.settings.dropdowns : [];
            return dropdowns.filter((dropdown) => {
                if (dropdown.action === 'BUTTON_PROFILE' && !this.profileEnabled) {
                    return false;
                }
                return !(dropdown.hidden !== undefined && this.getValueOrFunction(dropdown.hidden));
            });
        },
    },
    methods: {
        // Auth state management
        updateAuth() {
            this.$emit("update:modelValue", this.auth);
        },

        // user menu "Profile": the profile panel of VuAuth (password change)
        showProfilModal() {
            if (!this.profileEnabled) {
                return;
            }
            this.auth.panel = 'profile';
            this.auth.visible = true;
            this.updateAuth();
        },

        togglePanel() {
            this.auth.visible = !this.auth.visible;
            this.auth.panel = this.panel ? this.panel : 'login';
            this.updateAuth();
        },

        setSelectedRole(role) {
            this.auth.user.role = role;
            if (this.auth.roleHeader) {
                this.auth.header[this.auth.roleHeader] = this.auth.user.role;
            }

            localStorage.setItem('vu-user', JSON.stringify(this.auth.user));
            localStorage.setItem('vu-header', JSON.stringify(this.auth.header));
        },

        logout() {
            this.auth.visible = false;
            this.auth.user = null;            
            this.auth.header = null;
            this.auth.success = false;                        
            this.auth.settings = null;            
                    
            this.updateAuth();

            localStorage.removeItem('vu-user');
            localStorage.removeItem('vu-header');
            localStorage.removeItem('vu-settings');
        },

        // Dropdown handling
        dropdownAction(dropdown, $event) {
            if ($event) {
                $event.stopPropagation();
            }

            if (dropdown.action) {
                dropdown.action({
                    dropdown: dropdown,
                    settings: this.settings,
                }, this);
            }
        },

        // Language: dropdown.languages ([{ value, label, short? }]) or the available languages
        languages(dropdown) {
            return Array.isArray(dropdown.languages) && dropdown.languages.length ? dropdown.languages : availableLanguages();
        },

        changeLanguage(language) {
            setLanguage(language);
        },

        // Theme: dropdown.themes ([{ value, label, icon? }]) or the available themes (light, dark, system)
        themes(dropdown) {
            return Array.isArray(dropdown.themes) && dropdown.themes.length ? dropdown.themes : availableThemes();
        },

        changeTheme(theme) {
            setTheme(theme);
        },

        // labels are translated when they are a key of the built-in / settings dictionary (reactive to language)
        translate(value) {
            if (typeof value !== "string") {
                return value;
            }
            return translate(value, this.settings.translate, null, this.language);
        },

        // Utility methods
        getValueOrFunction(object, params) {
            return getValueOrFunction(object, params, this.settings, this);
        },
    },
    created() {
        // the user's choice (theme switch) wins over window.VuSettings.theme
        this.theme = effectiveTheme(window.VuSettings && window.VuSettings.theme);

        if (window.VuSettings && window.VuSettings.button) {

            if (window.VuSettings.button[this.panel]) {
                this.settings = window.VuSettings.button[this.panel];
            }
        }

        if (window.VuSettings && window.VuSettings.auth && window.VuSettings.auth.registrationEnabled === false) {
            this.registrationEnabled = false;
        }
    },

    mounted() {
        this._onLanguageChange = (event) => {
            this.language = event.detail.language;
        };
        window.addEventListener(LANGUAGE_CHANGE_EVENT, this._onLanguageChange);

        this._onThemeChange = (event) => {
            this.themeChoice = event.detail.theme;
            this.theme = effectiveTheme(window.VuSettings && window.VuSettings.theme);
        };
        window.addEventListener(THEME_CHANGE_EVENT, this._onThemeChange);
    },

    beforeUnmount() {
        window.removeEventListener(LANGUAGE_CHANGE_EVENT, this._onLanguageChange);
        window.removeEventListener(THEME_CHANGE_EVENT, this._onThemeChange);
    }
};

export default VuUserButton;
export { VuUserButton };

</script>

<style lang="scss">
.vua-user-button {

    .dropdown {
        display: inline-block;
    }

    .cursor-pointer {
        cursor: pointer;
    }
}
</style>
