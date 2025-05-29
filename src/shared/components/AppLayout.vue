<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import SidebarLeftComponent from './sidebar/SidebarLeftComponent.vue';
import SidebarTopComponent from './sidebar/SidebarTopComponent.vue';
import type { User } from '@supabase/supabase-js';
import type { Account } from '@/modules/accounts/models/Account';

defineProps<{
  user: User,
  account: Account
}>()

const isSidebarOpen = ref(true)
onMounted(async () => {
  // await accountStore.fetchAccount(props.user.id)
})
</script>

<template>
  <div class="min-h-screen bg-white p-4">
    <!-- Sidebar -->
    <SidebarLeftComponent
    :account="account"
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
