<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../store/useAuthStore';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');

const handleLogin = async () => {
  try {
    await authStore.signIn(email.value, password.value);
    // Rediriger vers la page demandée ou la page d'accueil
    const redirectPath = route.query.redirect as string || '/';
    router.push(redirectPath);
  } catch (e) {
    // L'erreur est déjà gérée dans le store
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-white to-fuchsia-50">
    <div class="max-w-md w-full space-y-8 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
      <!-- Logo et titre -->
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
          MyCoaching
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Connectez-vous à votre compte
        </p>
      </div>

      <!-- Message d'erreur -->
      <div v-if="authStore.error" class="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">{{ authStore.error }}</p>
          </div>
        </div>
      </div>

      <!-- Formulaire -->
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email" class="sr-only">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-violet-100 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-transparent"
              placeholder="Email"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Mot de passe</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-violet-100 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-transparent"
              placeholder="Mot de passe"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="authStore.loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                v-if="!authStore.loading"
                class="h-5 w-5 text-violet-300 group-hover:text-violet-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-else
                class="animate-spin h-5 w-5 text-violet-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
            {{ authStore.loading ? 'Connexion en cours...' : 'Se connecter' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>