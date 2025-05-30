<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/auth/store/useAuthStore'
import type { Account } from '@/modules/accounts/models/Account';
import { UserIcon } from '@heroicons/vue/24/solid';
import { computed } from 'vue';
import { calculateAge } from '@/shared/utils/CalculateAgeFromDate';

const router = useRouter()
const authStore = useAuthStore()

const props = defineProps<{
    isSidebarOpen: boolean,
    account: Account
}>();

const userAge = computed(() => {
  if (!props.account.birthday) return 'Non renseigné';
  return `${calculateAge(props.account.birthday)} ans`;
});

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
      <div class="flex flex-col items-center space-y-4">
        <img
          class="h-32 w-32 rounded-full ring-4 ring-blue-800 object-cover"
          src="https://images.unsplash.com/photo-1633008692730-ff6cdbdb7621?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div class="text-center">
          <h2 class="text-lg font-semibold text-gray-200">{{account.firstname}} {{account.lastname}}</h2>
          <p class="text-sm text-gray-400">{{account.email}}</p>
        </div>
        <div class="flex flex-row space-x-2">
            <UserIcon class="w-6 h-6" :class="{
              'text-blue-500' : account.gender === 'male',
              'text-pink-500' : account.gender === 'female',
            }"/>
            <p class="text-sm text-gray-400">{{ userAge }}</p>
        </div>
      </div>
    </div>

    <!-- User Stats -->
    <div class="p-6 space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-blue-900/30 rounded-2xl p-4">
          <p class="text-sm text-gray-400">Poids actuel</p>
          <p class="text-2xl font-semibold text-blue-400">{{ account.health?.weight || '-' }} kg</p>
        </div>
        <div class="bg-orange-900/20 rounded-2xl p-4">
          <p class="text-sm text-gray-400">Objectif</p>
          <p class="text-2xl font-semibold text-orange-400">{{ account.health?.target_weight || '-' }} kg</p>
        </div>
        <div class="bg-green-900/20 rounded-2xl p-4">
          <p class="text-sm text-gray-400">Différence</p>
          <p class="text-2xl font-semibold text-green-400">
            {{ account.health?.weight && account.health?.target_weight 
              ? (account.health.target_weight - account.health.weight).toFixed(1) 
              : '-' }} kg
          </p>
        </div>
        <div class="bg-purple-900/20 rounded-2xl p-4">
          <p class="text-sm text-gray-400">IMC</p>
          <p class="text-2xl font-semibold text-purple-400">
            {{ account.health?.weight && account.health?.height 
              ? ((account.health.weight / ((account.health.height / 100) ** 2))).toFixed(1)
              : '-' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Training Stats -->
    <div class="p-6 space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-blue-900/30 rounded-2xl p-4">
          <p class="text-sm text-gray-400">Séances cette semaine</p>
          <p class="text-2xl font-semibold text-blue-400">{{ account.objectives?.training_per_week || 0 }}</p>
        </div>
        <div class="bg-orange-900/20 rounded-2xl p-4">
          <p class="text-sm text-gray-400">Objectif hebdo</p>
          <p class="text-2xl font-semibold text-orange-400">{{ account.health?.target_training || 0 }}</p>
        </div>
      </div>
    </div>

    <!-- User Menu -->
    <div class="p-6 space-y-4">
      <!-- Suppression du bouton de déconnexion qui a été déplacé -->
    </div>
  </aside>
</template>
