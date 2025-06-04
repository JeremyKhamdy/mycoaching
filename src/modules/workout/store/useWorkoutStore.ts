import { defineStore } from 'pinia'
import type { Exercice } from '../models/Exercice'
import { ref } from 'vue'
import { useExerciceService } from '../services/useExerciceService'

export const useWorkoutStore = defineStore('workout', () => {
  const { getExercices } = useExerciceService()
  const exercices = ref<Exercice[]>([])

  const fetchExercices = async () => {
    try {
      const { data, error, status } = await getExercices()

      console.log('data exercices:', data)
      console.log('status:', status)
      if (error) throw new Error(error.message)
    } catch (e) {
      console.log(e)
    }
  }

  return {
    exercices,
    fetchExercices
  }
})
