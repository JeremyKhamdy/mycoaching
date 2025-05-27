import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAccountService } from '../services/useAccountService'
import type { Account } from '../models/Account'

export const useAccountStore = defineStore('account', () => {
  const account = ref<Account | null>(null)
  const accounts = ref<Account[]>([])
  const loading = ref(false)
  const { getAccount, getAccounts, postAccount } = useAccountService()

  const fetchAccount = async (userId: string) => {
    loading.value = true
    try {
      const { data } = await getAccount(userId)
      console.log(data)
      account.value = data as Account
      console.log('...fetching account')
    } catch (error) {
      console.error('Error fetching accounts:', error)
    } finally {
      loading.value = false
    }
  }

  const fetchAccounts = async () => {
    loading.value = true
    try {
      const { data } = await getAccounts()
      accounts.value = data as Account[]
    } catch (error) {
      console.error('Error fetching accounts:', error)
    } finally {
      loading.value = false
    }
  }

  const createAccount = async (accountData: Partial<Omit<Account, 'id'>>) => {
    loading.value = true
    try {
      // TODO: Replace with actual API call
      const { data } = await postAccount(accountData)
      accounts.value.push(data)
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const updateAccount = async (id: number, userData: Partial<Account>) => {
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
      const updatedAccount = await response.json()
      const index = accounts.value.findIndex((account) => account.id === id)
      if (index !== -1) {
        accounts.value[index] = updatedAccount
      }
      return updatedAccount
    } catch (error) {
      console.error('Error updating account:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const deleteAccount = async (id: number) => {
    loading.value = true
    try {
      // TODO: Replace with actual API call
      await fetch(`/api/users/${id}`, {
        method: 'DELETE'
      })
      accounts.value = accounts.value.filter((account) => account.id !== id)
    } catch (error) {
      console.error('Error deleting account:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    account,
    accounts,
    loading,
    fetchAccount,
    fetchAccounts,
    createAccount,
    updateAccount,
    deleteAccount
  }
})
