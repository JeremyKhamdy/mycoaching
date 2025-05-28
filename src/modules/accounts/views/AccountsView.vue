<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useAccountStore } from '../store/useAccountStore';
import AccountsListComponent from '../components/AccountsListComponent.vue';
import AccountFormComponent from '../components/AccountFormComponent.vue';
import type { Account } from '../models/Account';

const store = useAccountStore();
const showAccountForm = ref(false);
const editingAccount = ref<Account | null>(null);
const searchQuery = ref('');
const statusFilter = ref('all');

onMounted(() => {
  if (store.accounts.length === 0) {
    store.fetchAccounts();
  }
});

const handleEdit = (account: Account) => {
  editingAccount.value = { ...account };
  showAccountForm.value = true;
};

const handleDelete = async (accountId: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    await store.deleteAccount(accountId);
  }
};

const handleFormSubmit = async (accountData: Partial<Omit<Account, 'id'>>) => {
  if (editingAccount.value) {
    await store.updateAccount(editingAccount.value.id, accountData);
  } else {
    // await store.createAccount(accountData);
  }
  showAccountForm.value = false;
  editingAccount.value = null;
};
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-night-900">Utilisateurs</h1>
      <!-- <button
        @click="handleCreate"
        class="btn-primary flex items-center space-x-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>Nouvel utilisateur</span>
      </button> -->
    </div>

    <!-- Filters -->
    <!-- <div class="card">
      <UsersFilterComponent
        v-model:searchQuery="searchQuery"
        v-model:statusFilter="statusFilter"
      />
    </div> -->

    <!-- Users List -->
    <div class="card">
      <AccountsListComponent
        :accounts="store.accounts"
        :search-query="searchQuery"
        :status-filter="statusFilter"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>
  </div>

  <!-- User Form Modal -->
  <Teleport to="body">
    <div
      v-if="showAccountForm"
      class="fixed inset-0 bg-night-900/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="card w-full max-w-md mx-4">
        <h2 class="text-xl font-bold text-night-900 mb-4">
          {{ editingAccount ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur' }}
        </h2>
        <AccountFormComponent
          :account="editingAccount"
          @submit="handleFormSubmit"
          @cancel="showAccountForm = false"
        />
      </div>
    </div>
  </Teleport>
</template>