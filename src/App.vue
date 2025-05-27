<script setup lang="ts">
import { RouterView } from 'vue-router'
import AuthProvider from './modules/auth/components/AuthProvider.vue';
import AppLayout from './shared/components/AppLayout.vue';
import type { User } from '@supabase/supabase-js';
</script>

<template>
  <AuthProvider v-slot="{ user }">
    <AppLayout :user="user">
      <RouterView />
    </AppLayout>
  </AuthProvider>
</template>

<style>
.glass-effect {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>