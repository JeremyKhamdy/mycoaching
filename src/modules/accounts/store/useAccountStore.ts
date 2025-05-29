import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAccountService } from '../services/useAccountService'
import type { Account } from '../models/Account'

export const useAccountStore = defineStore('account', () => {
  const account = ref<Account | null>(null)
  const accounts = ref<Account[] | null>([])
  const loading = ref(false)
  const { getAccount, getAccounts, postAccount, patchAccount } = useAccountService()

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
      accounts.value = data
    } catch (error) {
      console.error('Error fetching accounts:', error)
    } finally {
      loading.value = false
    }
  }

  const createAccount = async (accountData: Partial<Account>, email: string, userId: string) => {
    loading.value = true
    try {
      const { data } = await postAccount(accountData, email, userId)
      account.value = data
    } catch (error) {
      console.error('Error fetching accounts:', error)
    } finally {
      loading.value = false
    }
  }

  const updateAccount = async (accountId: number, accountData: Partial<Account>) => {
    loading.value = true

    try {
      const { data } = await patchAccount(accountId, accountData)
      if (accounts.value) {
        const index = accounts.value?.findIndex((a) => a.id === accountId)
        if (index !== -1) {
          accounts.value[index] = data as Account
        }
      }
    } catch (error) {
      console.error('Error fetching accounts:', error)
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
    updateAccount
  }
})
