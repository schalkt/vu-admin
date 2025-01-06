<template>

    <div v-if="(!auth.user && panel != 'login') || panel == 'login'" class="vua-user-button d-inline-block" :data-bs-theme="[theme]">
        <div v-if="auth.user" class="dropdown">
            <button class="dropdown-toggle" :class="[settings.class]" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <span v-html="getValueOrFunction(settings.label)"></span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">

                <template v-for="dropdown in settings.dropdowns" :key="dropdown">
                    <li v-if="dropdown.action == 'BUTTON_ROLES'" :class="[dropdown.class]" class="d-flex items-align-center">
                        <span v-html="getValueOrFunction(dropdown.label)" class="me-2"></span>
                        <button v-for="role in auth.user.roles" :key="role" @click="setSelectedRole(role)"                                
                                class="btn btn-sm btn-secondary p-0 px-1 me-1"
                                :class="{'bg-primary text-light' : role == auth.user.role}">
                            {{ role }}
                        </button>
                    </li>
                    <li v-else :class="[dropdown.class]" @click="dropdownAction(dropdown)" v-html="getValueOrFunction(dropdown.label)"></li>

                </template>
            </ul>
        </div>
        <div v-else class="d-inline-block">
            <button :class="[settings.class]" type="button" @click="togglePanel">
                <i v-if="settings.icon" :class="[settings.icon]"></i>
                <span v-html="getValueOrFunction(settings.label)"></span>
            </button>
        </div>
    </div>

</template>

<script>

import mitt from 'mitt';
import {
    deepMerge,
    getValueOrFunction,
} from "./helpers";

const eventBus = mitt();

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
        }
    },
    watch: {
        modelValue(newValue, oldValue) {

            if (newValue != oldValue) {
                this.auth = newValue;
                this.$forceUpdate();
            }

        },
    },
    computed: {
        // user: {
        //     get() {
        //         return this.modelValue;
        //     },
        //     set(newValue) {
        //         this.$emit("update:modelValue", newValue);
        //     },
        // },
    },
    methods: {

        getValueOrFunction(object, params) {
            return getValueOrFunction(object, params, this.settings, this);
        },

        dropdownAction(dropdown, $event) {

            if ($event) {
                $event.stopPropagation();
            }

            let params = {
                dropdown: dropdown,
                settings: this.settings,
            }

            if (dropdown.action) {
                dropdown.action(params, this);
                return;
            }

        },

        updateAuth() {
            this.$emit("update:modelValue", this.auth);
        },

        togglePanel() {
            this.auth.visible = !this.auth.visible;
            this.auth.panel = this.panel ? this.panel : 'login';
            this.updateAuth();

            console.log(this.auth);

        },

        setSelectedRole(role) {
            this.auth.user.role = role;
            this.auth.header['X-Auth-Role'] = this.auth.user.role;

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
    },
    created() {
        if (window.VuSettings && window.VuSettings.button) {

            this.theme = window.VuSettings.theme ? window.VuSettings.theme : "light";

            if (window.VuSettings.button[this.panel]) {
                this.settings = window.VuSettings.button[this.panel];
            }
        }
    },

    mounted() {



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
