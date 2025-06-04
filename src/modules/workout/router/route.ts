import type { RouteRecordRaw } from 'vue-router'
import WorkoutView from '../views/WorkoutView.vue'

export const workoutRoute: RouteRecordRaw = {
  path: '/workout',
  name: 'workout',
  meta: { requiredAuth: true },
  component: WorkoutView,
  children: []
}
