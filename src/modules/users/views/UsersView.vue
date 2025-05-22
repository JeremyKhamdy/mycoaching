<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../store/useUserStore';
import UsersListComponent from '../components/UsersListComponent.vue';
import UsersFilterComponent from '../components/UsersFilterComponent.vue';
import UserFormComponent from '../components/UserFormComponent.vue';
import type { User } from '../models/User';

const store = useUserStore();
const showUserForm = ref(false);
const editingUser = ref<User | null>(null);
const searchQuery = ref('');
const statusFilter = ref('all');

onMounted(() => {
  if (store.users.length === 0) {
    store.fetchUsers();
  }
});

const handleEdit = (user: User) => {
  editingUser.value = { ...user };
  showUserForm.value = true;
};

const handleDelete = async (userId: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    await store.deleteUser(userId);
  }
};

const handleCreate = () => {
  editingUser.value = null;
  showUserForm.value = true;
};

const handleFormSubmit = async (userData: Omit<User, 'id'>) => {
  if (editingUser.value) {
    await store.updateUser(editingUser.value.id, userData);
  } else {
    await store.createUser(userData);
  }
  showUserForm.value = false;
  editingUser.value = null;
};
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">Utilisateurs</h1>
      <button
        @click="handleCreate"
        class="px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-2xl hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>Nouvel utilisateur</span>
      </button>
    </div>

    <!-- Filters -->
    <UsersFilterComponent
      v-model:searchQuery="searchQuery"
      v-model:statusFilter="statusFilter"
    />

    <!-- Users List -->
    <UsersListComponent
      :users="store.users"
      :search-query="searchQuery"
      :status-filter="statusFilter"
      @edit="handleEdit"
      @delete="handleDelete"
    />
  </div>

  <!-- User Form Modal -->
   <Teleport to="body">
    <div
    v-if="showUserForm"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
        <div class="bg-white rounded-2xl p-6 w-full max-w-md">
        <h2 class="text-xl font-bold text-gray-900 mb-4">
            {{ editingUser ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur' }}
        </h2>
        <UserFormComponent
            :user="editingUser"
            @submit="handleFormSubmit"
            @cancel="showUserForm = false"
        />
        </div>
    </div>
   </Teleport>

</template>