<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { 
  ArrowRightStartOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon
} from '@heroicons/vue/24/outline';
import { useAccountStore } from '@/modules/accounts/store/useAccountStore';
import { computed } from 'vue';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';

const props = defineProps<{
    isSidebarOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'update:isSidebarOpen', value: boolean): void
}>()

const authStore = useAuthStore();

const isAdmin = computed(() => authStore.isAdmin());

const navigation = [
  { name: 'Dashboard', to: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { name: 'Séances d\'entraînements', to: '/workout', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { name: 'Mes exercices', to: '/exercices', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { name: 'Comptes utilisateurs', to: '/accounts', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', adminOnly: true },
  { name: 'Mon profil', to: '/profil', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { name: 'Paramètres', to: '/settings', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', adminOnly: true },
]

const filteredNavigation = computed(() => {
  return navigation.filter(item => !item.adminOnly || isAdmin.value);
});
</script>

<template>
  <div class="sticky top-0 z-40 bg-white py-4">
    <div class="flex items-center justify-between h-16 px-6">
      <!-- Left side -->
      <div class="flex items-center space-x-4">
        <button
        @click="emit('update:isSidebarOpen', !isSidebarOpen)"
        class="p-2 rounded-2xl text-night-800 focus:outline-none transition-all duration-200"
        >
        <ArrowLeftStartOnRectangleIcon v-if="isSidebarOpen" class=" h-6 w-6"/>
        <ArrowRightStartOnRectangleIcon v-else  class="h-6 w-6"/>
      </button>
        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-4">
          <RouterLink
            v-for="item in filteredNavigation"
            :key="item.name"
            :to="item.to"
            class="group flex items-center px-4 py-2 text-sm font-medium rounded-2xl transition-all duration-200 hover:scale-105"
            :class="[
              $route.path === item.to
                ? 'bg-gradient-to-r from-night-900 to-night-800 text-white shadow-lg shadow-blue-900/30'
                : 'text-gray-300 hover:bg-blue-900/30 hover:text-orange-400'
            ]"
          >
            <!-- <svg
              class="mr-2 h-5 w-5 transition-transform duration-200 group-hover:scale-110"
              :class="[
                $route.path === item.to
                  ? 'text-white'
                  : 'text-gray-400 group-hover:text-orange-400'
              ]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="item.icon"
              />
            </svg> -->
            {{ item.name }}
          </RouterLink>
        </nav>
      </div>

      <!-- Right side -->
      <div class="flex items-center space-x-4">
      </div>
    </div>
  </div>
</template>