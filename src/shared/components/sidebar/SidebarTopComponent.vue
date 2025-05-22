<script lang="ts" setup>
defineProps<{
    isSidebarOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'is-sidebar-open-event', value: boolean): void
}>()
</script>

<template>
  <div class="sticky top-0 z-40 glass-effect border-b border-violet-100/50">
    <div class="flex items-center justify-between h-16 px-6">
      <!-- Left side -->
      <div class="flex items-center">
        <button
          @click="emit('is-sidebar-open-event', !isSidebarOpen)"
          class="p-2 rounded-2xl text-gray-500 hover:text-violet-600 hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all duration-200"
        >
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <!-- Right side -->
      <div class="flex items-center space-x-4">
        <!-- Search -->
        <div class="relative">
          <input
            type="text"
            placeholder="Search..."
            class="w-64 pl-10 pr-4 py-2 text-sm border border-violet-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-transparent transition-all duration-200"
          />
          <svg
            class="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <!-- Notifications -->
        <button class="p-2 rounded-2xl text-gray-500 hover:text-violet-600 hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all duration-200">
          <div class="relative">
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span class="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </div>
        </button>

        <!-- User Menu -->
        <div class="relative">
          <button
            class="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-violet-200 rounded-2xl p-1 hover:bg-violet-50 transition-all duration-200"
          >
            <img
              class="h-8 w-8 rounded-full ring-2 ring-violet-200"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <span class="text-sm font-medium text-gray-700">John Doe</span>
            <svg
              class="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>