<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import SidebarMenuLeftComponent from './shared/components/sidebar/SidebarMenuLeftComponent.vue';
import SidebarTopComponent from './shared/components/sidebar/SidebarTopComponent.vue';

const isSidebarOpen = ref(true)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-violet-50 via-white to-fuchsia-50">
    <!-- Sidebar -->
    <SidebarMenuLeftComponent :is-sidebar-open="isSidebarOpen" />
    
    <!-- Main Content -->
    <div
      :class="[
        'transition-all duration-300 ease-in-out',
        isSidebarOpen ? 'ml-72' : 'ml-0'
      ]"
    >
      <!-- Top Navigation -->
      <SidebarTopComponent 
        :is-sidebar-open="isSidebarOpen" 
        @is-sidebar-open-event="(event) => isSidebarOpen = event"
      />

      <!-- Page Content -->
      <main class="p-6">
        <div class="max-w-7xl mx-auto">
          <div class="bg-white/60 backdrop-blur-sm rounded-3xl shadow-sm border border-violet-100/50 p-6">
            <RouterView />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #8b5cf6;
  border-radius: 4px;
  transition: all 0.2s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: #7c3aed;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Glass effect */
.glass-effect {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(139, 92, 246, 0.1);
}
</style>
