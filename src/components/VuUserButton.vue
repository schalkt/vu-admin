<template>

    <div v-if="(!auth.user && settings.panel != 'login') || settings.panel == 'login'" class="vua-user-button d-inline-block">
        <div v-if="auth.user" class="dropdown">
            <button class="dropdown-toggle" :class="[settings.class]" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <span v-html="getValueOrFunction(settings.label)"></span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <template v-for="dropdown in settings.dropdowns" :key="dropdown">
                    <li :class="[dropdown.class]" @click="dropdownAction(dropdown)" v-html="getValueOrFunction(dropdown.label)"></li>
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
    getValueOrFunction,
} from "./helpers";

const eventBus = mitt();

const VuUserButton = {
    name: "VuUserButton",
    props: {
        modelValue: Object,
        settings: Object
    },
    data() {
        return {
            auth: {},
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
            this.auth.panel = this.settings.panel ? this.settings.panel : 'login';
            this.updateAuth();
        },

        logout() {

            this.auth.visible = false;
            this.auth.user = null;
            this.auth.header = null;
            this.auth.success = false;

            localStorage.removeItem('vu-header');
            localStorage.removeItem('vu-user');

            this.updateAuth();

        },
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
