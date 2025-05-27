<script lang="ts" setup>
import { computed } from 'vue';
import type { Account } from '../models/Account';

const props = defineProps<{
  accounts: Account[];
  searchQuery: string;
  statusFilter: string;
}>();

const emit = defineEmits<{
  (e: 'edit', account: Account): void;
  (e: 'delete', accountId: number): void;
}>();

const filteredAccounts = computed(() => {
  return props.accounts.filter(account => {
    const matchesSearch = props.searchQuery.length > 5 && account.firstname.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
                         account.lastname.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
                         account.email.toLowerCase().includes(props.searchQuery.toLowerCase());
    return matchesSearch;
  });
});

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-50 text-green-600';
    case 'inactive':
      return 'bg-red-50 text-red-600';
    case 'pending':
      return 'bg-yellow-50 text-yellow-600';
    default:
      return 'bg-night-50 text-night-600';
  }
};

const handleEdit = (account: Account) => {
  emit('edit', account);
};

const handleDelete = (accountId: number) => {
  emit('delete', accountId);
};
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-night-200">
      <thead>
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-night-500 uppercase tracking-wider">
            Utilisateur
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-night-500 uppercase tracking-wider">
            Email
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-night-500 uppercase tracking-wider">
            Statut
          </th>
          <th class="px-6 py-3 text-right text-xs font-medium text-night-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-night-200">
        <tr v-for="account in filteredAccounts" :key="account.id" class="hover:bg-night-50/50">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="h-10 w-10 flex-shrink-0">
                <!-- <img
                  :src="account.avatar_url || 'https://ui-avatars.com/api/?name=' + account.firstname"
                  :alt="account.firstname"
                  class="h-10 w-10 rounded-full"
                /> -->
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-night-900">{{ account.firstname }} {{ account.lastname }}</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-night-500">{{ account.email }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <!-- <span
              :class="[
                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                getStatusColor(account.status)
              ]"
            >
              {{ account.status }}
            </span> -->
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button
              @click="handleEdit(account)"
              class="text-primary-600 hover:text-primary-700 mr-4"
            >
              Modifier
            </button>
            <button
              @click="handleDelete(account.id)"
              class="text-red-600 hover:text-red-700"
            >
              Supprimer
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>