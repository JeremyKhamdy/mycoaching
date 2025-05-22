<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps<{
  searchQuery: string;
  statusFilter: string;
}>();

const emit = defineEmits<{
  (e: 'update:searchQuery', value: string): void;
  (e: 'update:statusFilter', value: string): void;
}>();

const localSearchQuery = ref(props.searchQuery);
const localStatusFilter = ref(props.statusFilter);

watch(localSearchQuery, (newValue) => {
  emit('update:searchQuery', newValue);
});

watch(localStatusFilter, (newValue) => {
  emit('update:statusFilter', newValue);
});
</script>

<template>
  <div class="flex items-center space-x-4 bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-violet-100/50">
    <div class="flex-1">
      <div class="relative">
        <input
          v-model="localSearchQuery"
          type="text"
          placeholder="Rechercher un utilisateur..."
          class="w-full pl-10 pr-4 py-2 text-sm border border-violet-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-transparent"
        />
        <svg
          class="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
    <select
      v-model="localStatusFilter"
      class="px-4 py-2 text-sm border border-violet-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-transparent"
    >
      <option value="all">Tous les statuts</option>
      <option value="active">Actif</option>
      <option value="inactive">Inactif</option>
    </select>
  </div>
</template> 