<template>

    <div v-if="(!auth || !auth.user && settings.panel != 'login') || settings.panel == 'login'" class="d-inline-block">
        <div v-if="auth && auth.user" class="dropdown">
            <button class="dropdown-toggle" :class="[settings.class]" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <img class="img-fluid rounded" width="22" :src="auth.user.image">
                {{ auth.user.username }}
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li>
                    <span class="dropdown-item text-muted fw-light">
                        {{ auth.user.firstName }}
                        {{ auth.user.lastName }}
                        <br>
                        {{ auth.user.email }}
                    </span>
                </li>
                <li class="dropdown-divider"></li>
                <li>
                    <button type="button" class="dropdown-item" @click="logout">
                        <i class="bi bi-door-open"></i> Kilépés
                    </button>
                </li>
            </ul>
        </div>
        <div v-else class="d-inline-block">
            <button :class="[settings.class]" type="button" @click="togglePanel">
                <i v-if="settings.icon" :class="[settings.icon]"></i>
                <span v-html="settings.label"></span>
            </button>
        </div>
    </div>

</template>

<script>

import mitt from 'mitt';
const eventBus = mitt();

const VuUserButton = {
    name: "VuUserButton",
    props: {
        modelValue: Object,
        settings: Object
    },
    data() {
        return {
            auth: undefined,
        }
    },
    watch: {
        modelValue(newValue) {
            this.auth = newValue ? newValue : undefined;
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

<style scoped>
.dropdown {
    display: inline-block;
}
</style>