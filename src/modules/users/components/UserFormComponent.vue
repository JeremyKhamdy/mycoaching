<script lang="ts" setup>
import { ref, onMounted } from 'vue';

interface User {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

const props = defineProps<{
  user?: User | null;
}>();

const emit = defineEmits<{
  (e: 'submit', user: User): void;
  (e: 'cancel'): void;
}>();

const formData = ref<User>({
  firstname: '',
  lastname: '',
  email: '',
  status: 'active',
  avatar: ''
});

onMounted(() => {
  if (props.user) {
    formData.value = { ...props.user };
  }
});

const handleSubmit = () => {
  emit('submit', formData.value);
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="firstname" class="block text-sm font-medium text-gray-700">Prénom</label>
      <input
        id="firstname"
        v-model="formData.firstname"
        type="text"
        required
        class="mt-1 block w-full px-3 py-2 border border-violet-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-transparent"
      />
    </div>

    <div>
      <label for="lastname" class="block text-sm font-medium text-gray-700">Nom</label>
      <input
        id="lastname"
        v-model="formData.lastname"
        type="text"
        required
        class="mt-1 block w-full px-3 py-2 border border-violet-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-transparent"
      />
    </div>

    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input
        id="email"
        v-model="formData.email"
        type="email"
        required
        class="mt-1 block w-full px-3 py-2 border border-violet-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-transparent"
      />
    </div>

    <div>
      <label for="status" class="block text-sm font-medium text-gray-700">Statut</label>
      <select
        id="status"
        v-model="formData.status"
        required
        class="mt-1 block w-full px-3 py-2 border border-violet-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-transparent"
      >
        <option value="active">Actif</option>
        <option value="inactive">Inactif</option>
      </select>
    </div>

    <div>
      <label for="avatar" class="block text-sm font-medium text-gray-700">Avatar URL</label>
      <input
        id="avatar"
        v-model="formData.avatar"
        type="url"
        class="mt-1 block w-full px-3 py-2 border border-violet-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-transparent"
      />
    </div>

    <div class="flex justify-end space-x-3 pt-4">
      <button
        type="button"
        @click="emit('cancel')"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-200"
      >
        Annuler
      </button>
      <button
        type="submit"
        class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-200"
      >
        {{ props.user ? 'Modifier' : 'Créer' }}
      </button>
    </div>
  </form>
</template> 