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
  { name: 'Dashboard', to: '/dashboard' },
  { name: 'Séances d\'entraînements', to: '/workout'},
  { name: 'Mes exercices', to: '/exercices' },
  { name: 'Comptes utilisateurs', to: '/accounts', adminOnly: true },
  { name: 'Mon profil', to: '/profil' },
  { name: 'Paramètres', to: '/settings', adminOnly: true },
]

const filteredNavigation = computed(() => {
  return navigation.filter(item => !item.adminOnly || isAdmin.value);
});
</script>

<template>
  <div class="sticky top-0 z-40 bg-white py-4 h-16">
    <div class="flex items-center justify-between h-full px-6">
      <!-- Left side -->
      <div class="flex items-center space-x-4 pr-6 flex-1 min-w-0">
        <button
          @click="emit('update:isSidebarOpen', !isSidebarOpen)"
          class="p-2 rounded-2xl text-night-800 focus:outline-none transition-all duration-200 flex-shrink-0"
        >
          <ArrowLeftStartOnRectangleIcon v-if="isSidebarOpen" class="h-6 w-6"/>
          <ArrowRightStartOnRectangleIcon v-else class="h-6 w-6"/>
        </button>
        <!-- Navigation -->
        <div class="hidden md:block flex-1 min-w-0">
          <nav class="flex items-center space-x-4">
            <RouterLink
              v-for="item in filteredNavigation"
              :key="item.name"
              :to="item.to"
              class="group flex items-center px-2 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 truncate"
              :class="[
                $route.path === item.to
                  ? 'text-night-900 border-b border-night-900'
                  : 'text-gray-300  hover:text-orange-400'
              ]"
            >
              {{ item.name }}
            </RouterLink>
          </nav>
        </div>
      </div>

      <!-- Right side - Fixed position -->
      <div class="flex-shrink-0 ml-6">
        <button
          @click="authStore.signOut()"
          class="flex items-center px-4 py-2 text-sm font-medium rounded-2xl transition-all duration-200 hover:scale-105 text-red-900/30 hover:text-red-400 whitespace-nowrap min-w-[140px] justify-center"
        >
          <ArrowRightStartOnRectangleIcon class="h-5 w-5 mr-2 flex-shrink-0" />
          <span class="flex-shrink-0">Se déconnecter</span>
        </button>
      </div>
    </div>
  </div>
</template>