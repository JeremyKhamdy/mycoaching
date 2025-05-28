<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import SidebarLeftComponent from './sidebar/SidebarLeftComponent.vue';
import SidebarTopComponent from './sidebar/SidebarTopComponent.vue';
import { useAccountStore } from '@/modules/accounts/store/useAccountStore';
import type { User } from '@supabase/supabase-js';

const props = defineProps<{
  user: User
}>()
const isSidebarOpen = ref(true)
const accountStore = useAccountStore()
onMounted(async () => {
  await accountStore.fetchAccount(props.user.id)
})
</script>

<template>
  <div class="min-h-screen bg-white p-4">
    <!-- Sidebar -->
    <SidebarLeftComponent 
    :is-sidebar-open="isSidebarOpen" 
    />
    
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
      @update:isSidebarOpen="(event) => isSidebarOpen = event"
      />

      <!-- Page Content -->
      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">
            <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>
<style>
.glass-effect {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>
