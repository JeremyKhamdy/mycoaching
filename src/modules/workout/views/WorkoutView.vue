<script lang="ts" setup>
import { onMounted } from 'vue';
import { useWorkoutStore } from '../store/useWorkoutStore';


const workoutStore = useWorkoutStore()

onMounted(async () => {
    await workoutStore.fetchExercices()
})
</script>

<template>
    <div></div>
</template>

