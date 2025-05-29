<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useAccountStore } from '../store/useAccountStore';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { 
  UserCircleIcon,
  HeartIcon,
  FlagIcon,
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline';
import type { Account } from '../models/Account';
import type { User } from '@supabase/supabase-js';

const props = defineProps<{
    user: User;
    account: Account
}>()
const authStore = useAuthStore();
const accountStore = useAccountStore();
const isEditing = ref(false);
const formData = ref<Partial<Account>>({});

        
formData.value = { 
    firstname: props.account.firstname,
    lastname: props.account.lastname,
    birthday: props.account.birthday,
    gender: props.account.gender,
    email: props.account.email,
};


const handleSubmit = async () => {
  if (authStore.user?.id && formData.value) {
    await accountStore.updateAccount(Number(authStore.user.id), formData.value);
    isEditing.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto px-6 space-y-8">
      <!-- Header -->
      <!-- <div class="bg-white rounded-2xl shadow-xl p-6">
        <h1 class="text-3xl font-bold text-night-900">Mon Profil</h1>
        <p class="mt-2 text-sm text-night-500">Gérez vos informations personnelles et vos objectifs</p>
      </div> -->

      <!-- Account Information Section -->
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div class="p-6 border-b border-night-200">
          <div class="flex items-center space-x-3">
            <UserCircleIcon class="h-8 w-8 text-orange-500" />
            <h2 class="text-xl font-semibold text-night-900">Informations Personnelles</h2>
          </div>
        </div>

        <div class="p-6">
          <div class="flex justify-end mb-6">
            <button
              @click="isEditing = !isEditing"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <PencilSquareIcon class="h-5 w-5 mr-2" />
              {{ isEditing ? 'Annuler' : 'Modifier' }}
            </button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Avatar Section -->
            <div class="lg:col-span-1">
              <div class="flex flex-col items-center p-6 bg-night-50 rounded-xl">
                <div class="h-32 w-32 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <UserCircleIcon class="h-24 w-24 text-orange-500" />
                </div>
                <h3 class="text-xl font-medium text-night-900 text-center">
                  {{ account.firstname }} {{ account.lastname }}
                </h3>
                <p class="text-sm text-night-500 mt-1">{{ account.email }}</p>
                <div class="mt-4 flex items-center space-x-2">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <span class="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                    Actif
                  </span>
                </div>
              </div>
            </div>

            <!-- Form Fields -->
            <div class="lg:col-span-2 space-y-6">
              <!-- Non-editable Information -->
              <div class="bg-night-50 rounded-xl p-6">
                <h4 class="text-sm font-medium text-night-500 mb-4">Informations de Compte</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-night-700">Email</label>
                    <div class="mt-1 flex items-center">
                      <p class="text-sm text-night-900">{{ account.email }}</p>
                      <span class="ml-2 text-night-400">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-night-700">Date de Naissance</label>
                    <p class="mt-1 text-sm text-night-900">{{ new Date(account.birthday).toLocaleDateString() }}</p>
                  </div>
                </div>
              </div>

              <!-- Editable Information -->
              <div class="bg-white rounded-xl p-6 border border-night-200">
                <h4 class="text-sm font-medium text-night-500 mb-4">Informations Personnelles</h4>
                <div class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-medium text-night-700 mb-1.5">Prénom</label>
                      <input
                        v-if="isEditing"
                        v-model="formData.firstname"
                        type="text"
                        class="mt-1 block w-full px-4 py-2.5 rounded-lg border border-night-200 bg-white text-night-900 placeholder-night-400 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 hover:border-night-300"
                        placeholder="Votre prénom"
                      />
                      <p v-else class="mt-1 px-4 py-2.5 text-sm text-night-900 bg-night-50 rounded-lg">{{ account.firstname }}</p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-night-700 mb-1.5">Nom</label>
                      <input
                        v-if="isEditing"
                        v-model="formData.lastname"
                        type="text"
                        class="mt-1 block w-full px-4 py-2.5 rounded-lg border border-night-200 bg-white text-night-900 placeholder-night-400 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 hover:border-night-300"
                        placeholder="Votre nom"
                      />
                      <p v-else class="mt-1 px-4 py-2.5 text-sm text-night-900 bg-night-50 rounded-lg">{{ account.lastname }}</p>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-night-700 mb-1.5">Téléphone</label>
                    <input
                      v-if="isEditing"
                      v-model="formData.phone_number"
                      type="tel"
                      class="mt-1 block w-full px-4 py-2.5 rounded-lg border border-night-200 bg-white text-night-900 placeholder-night-400 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 hover:border-night-300"
                      placeholder="Votre numéro de téléphone"
                    />
                    <p v-else class="mt-1 px-4 py-2.5 text-sm text-night-900 bg-night-50 rounded-lg">{{ account.phone_number || 'Non renseigné' }}</p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-night-700 mb-1.5">Genre</label>
                    <select
                      v-if="isEditing"
                      v-model="formData.gender"
                      class="mt-1 block w-full px-4 py-2.5 rounded-lg border border-night-200 bg-white text-night-900 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 hover:border-night-300 appearance-none cursor-pointer"
                    >
                      <option value="" disabled selected>Sélectionnez votre genre</option>
                      <option value="male">Homme</option>
                      <option value="female">Femme</option>
                    </select>
                    <p v-else class="mt-1 px-4 py-2.5 text-sm text-night-900 bg-night-50 rounded-lg">
                      {{ account.gender === 'male' ? 'Homme' : account.gender === 'female' ? 'Femme' : 'Non renseigné' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Save Button -->
          <div v-if="isEditing" class="flex justify-end space-x-4 mt-6">
            <button
              @click="isEditing = false"
              class="inline-flex items-center px-4 py-2 border border-night-300 rounded-lg shadow-sm text-sm font-medium text-night-700 bg-white hover:bg-night-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <XMarkIcon class="h-5 w-5 mr-2" />
              Annuler
            </button>
            <button
              @click="handleSubmit"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <CheckIcon class="h-5 w-5 mr-2" />
              Enregistrer
            </button>
          </div>
        </div>
      </div>

      <!-- Health Section -->
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div class="p-6 border-b border-night-200">
          <div class="flex items-center space-x-3">
            <HeartIcon class="h-8 w-8 text-orange-500" />
            <h2 class="text-xl font-semibold text-night-900">Informations de Santé</h2>
          </div>
        </div>

        <div class="p-6">
          <div class="flex justify-end mb-6">
            <button
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <PencilSquareIcon class="h-5 w-5 mr-2" />
              Modifier
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Health Stats -->
            <div class="bg-night-50 rounded-xl p-6">
              <h3 class="text-lg font-medium text-night-900 mb-6">Statistiques de Santé</h3>
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-night-700">Poids</label>
                  <p class="mt-1 text-lg text-night-900">{{ account.health?.weight || 'Non renseigné' }} kg</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-night-700">Taille</label>
                  <p class="mt-1 text-lg text-night-900">{{ account.health?.height || 'Non renseigné' }} cm</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-night-700">IMC</label>
                  <p class="mt-1 text-lg text-night-900">
                    {{ account.health?.weight && account.health?.height 
                      ? ((account.health.weight / ((account.health.height / 100) ** 2)).toFixed(1))
                      : 'Non calculable' }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Health Goals -->
            <div class="bg-night-50 rounded-xl p-6">
              <h3 class="text-lg font-medium text-night-900 mb-6">Objectifs de Santé</h3>
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-night-700">Objectif de Poids</label>
                  <p class="mt-1 text-lg text-night-900">{{ account.health?.target_weight || 'Non renseigné' }} kg</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-night-700">Niveau d'Activité</label>
                  <p class="mt-1 text-lg text-night-900">{{ account.health?.target_training || 'Non renseigné' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Objectives Section -->
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div class="p-6 border-b border-night-200">
          <div class="flex items-center space-x-3">
            <FlagIcon class="h-8 w-8 text-orange-500" />
            <h2 class="text-xl font-semibold text-night-900">Mes Objectifs</h2>
          </div>
        </div>

        <div class="p-6">
          <div class="flex justify-end mb-6">
            <button
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <PencilSquareIcon class="h-5 w-5 mr-2" />
              Ajouter un objectif
            </button>
          </div>

          <div class="bg-night-50 rounded-xl p-8">
            <p class="text-night-500 text-center text-lg">
              La gestion des objectifs sera bientôt disponible. Restez à l'écoute !
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>