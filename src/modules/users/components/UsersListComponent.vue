<script lang="ts" setup>
import { computed } from 'vue';
import type { User } from '../models/User';

const props = defineProps<{
  users: User[];
  searchQuery: string;
  statusFilter: string;
}>();

const emit = defineEmits<{
  (e: 'edit', user: User): void;
  (e: 'delete', userId: number): void;
}>();

const filteredUsers = computed(() => {
  return props.users.filter(user => {
    const matchesSearch = props.searchQuery.length > 5 && user.firstname.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
                         user.lastname.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(props.searchQuery.toLowerCase());
    return matchesSearch;
  });
});

const handleEdit = (user: User) => {
  emit('edit', user);
};

const handleDelete = (userId: number) => {
  emit('delete', userId);
};
</script>

<template>
  <div class="bg-white/60 backdrop-blur-sm rounded-2xl border border-violet-100/50 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-violet-100">
        <thead class="bg-violet-50/50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-violet-600 uppercase tracking-wider">
              Utilisateur
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-violet-600 uppercase tracking-wider">
              Email
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-violet-600 uppercase tracking-wider">
              Statut
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-violet-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-violet-100">
          <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-violet-50/50 transition-colors duration-200">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="h-10 w-10 flex-shrink-0">
                  <img
                    class="h-10 w-10 rounded-full"
                    :src="user.avatar || 'https://ui-avatars.com/api/?name=' + user.firstname + '+' + user.lastname"
                    :alt="user.firstname + ' ' + user.lastname"
                  />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ user.firstname }} {{ user.lastname }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ user.email }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="[
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                  user.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                ]"
              >
                {{ user.status === 'active' ? 'Actif' : 'Inactif' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div class="flex items-center space-x-3">
                <button
                  @click="handleEdit(user)"
                  class="text-violet-600 hover:text-violet-900 transition-colors duration-200"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  @click="handleDelete(user.id)"
                  class="text-red-600 hover:text-red-900 transition-colors duration-200"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>