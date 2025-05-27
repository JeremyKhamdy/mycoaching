<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { Account } from '../models/Account';

const props = defineProps<{
  account?: Account | null;
}>();

const emit = defineEmits<{
  (e: 'submit', account: Partial<Account>): void;
  (e: 'cancel'): void;
}>();

const formData = ref<Partial<Account>>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    birthday: '',
    height: 0,
    gender: null
});

onMounted(() => {
  if (props.account) {
    formData.value = { ...props.account };
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
      <label for="password" class="block text-sm font-medium text-gray-700">Mot de passse</label>
      <input
        id="password"
        v-model="formData.password"
        type="password"
        required
        class="mt-1 block w-full px-3 py-2 border border-violet-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-transparent"
      />
    </div>

    <div>
      <label for="birthday" class="block text-sm font-medium text-gray-700">Date de naissance</label>
      <input
        id="birthday"
        v-model="formData.birthday"
        type="date"
        required
        class="mt-1 block w-full px-3 py-2 border border-violet-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-transparent"
      />
    </div>

    <div>
      <label for="gender" class="block text-sm font-medium text-gray-700">Genre</label>
      <select
        id="gender"
        v-model="formData.gender"
        required
        class="mt-1 block w-full px-3 py-2 border border-violet-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-transparent"
      >
        <option value="male">Homme</option>
        <option value="female">Femme</option>
      </select>
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
        {{ props.account ? 'Modifier' : 'Créer' }}
      </button>
    </div>
  </form>
</template> 