<script lang="ts" setup>
import { onMounted } from 'vue';
import { useAuthStore } from '../store/useAuthStore';
import LoginView from '../views/LoginView.vue';
import VerifyOTPView from '../views/VerifyOTPView.vue';
import CreateAccountView from '@/modules/accounts/views/CreateAccountView.vue'
import { useAccountStore } from '@/modules/accounts/store/useAccountStore';

const authStore = useAuthStore()
const accountStore = useAccountStore()

onMounted(async () => {
    // if (authStore.user === null) {
    //     await authStore.fetchUser()
    //     accountStore.account = authStore.account
    // }
})
</script>

<template>
    <div v-if="authStore.loadingSession" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-white to-fuchsia-50">
        <div class="animate-spin h-8 w-8 text-violet-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
    </div>
    <template v-else>
        <slot v-if="authStore.user && authStore.account" :user="authStore.user" :account="authStore.account"></slot>
        <CreateAccountView v-else-if="authStore.user && !authStore.account" :user="authStore.user" />
        <VerifyOTPView v-else-if="authStore.pendingVerification" />
        <LoginView v-else />
    </template>
</template>