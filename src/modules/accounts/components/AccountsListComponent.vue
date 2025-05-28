<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useAccountStore } from '../store/useAccountStore';
import { 
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from '@heroicons/vue/24/outline';

const accountsStore = useAccountStore();
const searchQuery = ref('');

const filteredAccounts = computed(() => {
  if (!searchQuery.value) return accountsStore.accounts;
  const query = searchQuery.value.toLowerCase();
  return accountsStore.accounts.filter(account => 
    account.firstname.toLowerCase().includes(query) ||
    account.lastname.toLowerCase().includes(query) ||
    account.email.toLowerCase().includes(query)
  );
});

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return {
        bg: 'bg-green-100',
        text: 'text-green-800',
        icon: CheckCircleIcon
      };
    case 'inactive':
      return {
        bg: 'bg-red-100',
        text: 'text-red-800',
        icon: XCircleIcon
      };
    default:
      return {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        icon: ClockIcon
      };
  }
};
</script>

<template>
  <div class="bg-white rounded-lg shadow">
    <!-- Search -->
    <div class="p-4 border-b border-night-900/20">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher un compte..."
        class="w-full px-4 py-2 border border-night-900/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-night-500"
      />
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-night-900/20">
        <thead class="bg-night-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-night-500 uppercase tracking-wider">
              Nom
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
        <tbody class="bg-white divide-y divide-night-900/20">
          <tr v-for="account in filteredAccounts" :key="account.id" class="hover:bg-night-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="h-10 w-10 flex-shrink-0">
                  <!-- <img
                    :src="account.avatar_url"
                    :alt="account.name"
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
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="[getStatusColor(account.status).bg, getStatusColor(account.status).text]"
              >
                <component
                  :is="getStatusColor(account.status).icon"
                  class="mr-1.5 h-4 w-4"
                />
                {{ account.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                class="text-night-600 hover:text-night-900 mr-4"
                @click="$emit('edit', account)"
              >
                <PencilSquareIcon class="h-5 w-5" />
              </button>
              <button
                class="text-red-600 hover:text-red-900"
                @click="$emit('delete', account)"
              >
                <TrashIcon class="h-5 w-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>