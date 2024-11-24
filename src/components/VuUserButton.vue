<template>

    <div v-if="auth && auth.user" class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            <img height="22" :src="auth.user.image">
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
    <div v-else>
        <button class="btn btn-outline-secondary" type="button" @click="togglePanel">
            <i class="bi bi-box-arrow-in-right"></i> Bejelentkezés
        </button>
    </div>

</template>

<script>

import mitt from 'mitt';
const eventBus = mitt();

const VuUserButton = {
    name: "VuUserButton",
    props: {
        modelValue: {
            type: Object,
        },
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
            this.auth.panel = 'login';
            this.updateAuth();
        },

        logout() {
            
            this.auth.visible = false;
            this.auth.user = null;
            
            localStorage.removeItem('vu-token');
            localStorage.removeItem('vu-user');

            this.updateAuth();
        },
    },
    mounted() {
        // this.auth = { visible: false };
        // this.updateAuth();
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