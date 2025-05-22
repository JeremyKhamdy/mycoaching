<script lang="ts" setup>
import { RouterLink } from 'vue-router'

defineProps<{
    isSidebarOpen: boolean
}>();

const navigation = [
  { name: 'Dashboard', to: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { name: 'Users', to: '/users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
]
</script>

<template>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out glass-effect',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <!-- Logo -->
    <div class="flex items-center h-16 px-6 border-b border-violet-100/50">
      <div class="relative">
        <img src="@/assets/logo.svg" alt="Logo" class="h-10 w-10 animate-pulse" />
        <div class="absolute -top-1 -right-1 h-3 w-3 bg-fuchsia-500 rounded-full border-2 border-white"></div>
      </div>
      <span class="ml-3 text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
        MyCoaching
      </span>
    </div>

    <!-- Navigation -->
    <nav class="px-3 py-4">
      <div class="space-y-2">
        <RouterLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.to"
          class="group flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-200 hover:scale-105"
          :class="[
            $route.path === item.to
              ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-200'
              : 'text-gray-600 hover:bg-violet-50 hover:text-violet-600'
          ]"
        >
          <svg
            class="mr-3 h-5 w-5 transition-transform duration-200 group-hover:scale-110"
            :class="[
              $route.path === item.to
                ? 'text-white'
                : 'text-gray-400 group-hover:text-violet-500'
            ]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              :d="item.icon"
            />
          </svg>
          {{ item.name }}
        </RouterLink>
      </div>
    </nav>
  </aside>
</template>
