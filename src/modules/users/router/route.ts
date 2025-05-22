import { type RouteRecordRaw } from 'vue-router'
import UsersView from '../views/UsersView.vue'

export const usersRoute: RouteRecordRaw = {
  path: '/users',
  name: 'Users',
  component: UsersView,
  children: []
}
