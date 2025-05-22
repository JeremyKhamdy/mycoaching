import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserService } from '../services/useUserService'
import type { User } from '../models/User'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const loading = ref(false)

  const fetchUsers = async () => {
    loading.value = true
    try {
      const { getUsers } = useUserService()
      const { data } = await getUsers()
      users.value = data as User[]
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      loading.value = false
    }
  }

  const createUser = async (userData: Omit<User, 'id'>) => {
    loading.value = true
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      const newUser = await response.json()
      users.value.push(newUser)
      return newUser
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const updateUser = async (id: number, userData: Partial<User>) => {
    loading.value = true
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      const updatedUser = await response.json()
      const index = users.value.findIndex((user) => user.id === id)
      if (index !== -1) {
        users.value[index] = updatedUser
      }
      return updatedUser
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const deleteUser = async (id: number) => {
    loading.value = true
    try {
      // TODO: Replace with actual API call
      await fetch(`/api/users/${id}`, {
        method: 'DELETE'
      })
      users.value = users.value.filter((user) => user.id !== id)
    } catch (error) {
      console.error('Error deleting user:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    loading,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  }
})
