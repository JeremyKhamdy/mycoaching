<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/auth/store/useAuthStore'

const router = useRouter()
const authStore = useAuthStore()

defineProps<{
    isSidebarOpen: boolean
}>();

const handleLogout = async () => {
  try {
    await authStore.signOut()
    router.push('/login')
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error)
  }
}
</script>

<template>
  <aside
    :class="[
      'fixed inset-y-4 rounded-xl z-50 w-72 transform transition-transform duration-300 ease-in-out glass-effect bg-gradient-to-br from-night-900 via-night-800 to-night-950',
      isSidebarOpen ? 'translate-x-0' : ' -translate-x-full'
    ]"
  >
    <!-- Logo et bouton de slideout -->
    <div class="flex items-center justify-between h-16 px-6 border-b border-blue-900/20">
      <div class="flex items-center">
        <div class="relative">
          <img src="@/assets/logo.svg" alt="Logo" class="h-10 w-10 animate-pulse" />
          <div class="absolute -top-1 -right-1 h-3 w-3 bg-orange-400 rounded-full border-2 border-blue-950"></div>
        </div>
        <span class="ml-3 text-xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
          MyCoaching
        </span>
      </div>
    </div>

    <!-- User Profile -->
    <div class="p-6 border-b border-blue-900/20">
      <div class="flex items-center space-x-4">
        <img
          class="h-16 w-16 rounded-full ring-4 ring-blue-800"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <div>
          <h2 class="text-lg font-semibold text-gray-200">John Doe</h2>
          <p class="text-sm text-gray-400">john.doe@example.com</p>
        </div>
      </div>
    </div>

    <!-- User Stats -->
    <div class="p-6 space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-blue-900/30 rounded-2xl p-4">
          <p class="text-sm text-gray-400">Sessions</p>
          <p class="text-2xl font-semibold text-blue-400">12</p>
        </div>
        <div class="bg-orange-900/20 rounded-2xl p-4">
          <p class="text-sm text-gray-400">Objectifs</p>
          <p class="text-2xl font-semibold text-orange-400">3</p>
        </div>
      </div>
    </div>

    <!-- User Menu -->
    <div class="p-6 space-y-4">
      <button
        class="w-full flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-200 hover:scale-105 text-gray-300 hover:bg-blue-900/30 hover:text-orange-400"
      >
        <svg
          class="mr-3 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        Mon Profil
      </button>

      <button
        class="w-full flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-200 hover:scale-105 text-gray-300 hover:bg-blue-900/30 hover:text-orange-400"
      >
        <svg
          class="mr-3 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        Paramètres
      </button>

      <!-- Bouton de déconnexion -->
      <button
        @click="handleLogout"
        class="w-full flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-200 hover:scale-105 text-gray-300 hover:bg-red-900/30 hover:text-red-400"
      >
        <svg
          class="mr-3 h-5 w-5 transition-transform duration-200 group-hover:scale-110 text-gray-400 group-hover:text-red-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Se déconnecter
      </button>
    </div>
  </aside>
</template>
