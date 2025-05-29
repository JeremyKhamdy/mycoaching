import type { Account } from '@/modules/accounts/models/Account'
import { useAccountService } from '@/modules/accounts/services/useAccountService'
import { supabase } from '@/shared/services/supabaseClient'
import type { Session, User } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const account = ref<Account | null>(null)
  const actualSession = ref<Session | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pendingVerification = ref<boolean>(false)
  const pendingVerificationEmail = ref<string>('')

  const { getAccount } = useAccountService()

  const fetchUser = async () => {
    console.log('Fetching user...')
    loading.value = true
    try {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession()

      console.log('Session:', session)
      actualSession.value = session
      user.value = session?.user ?? null
      loading.value = false
      console.log('User:', user.value)
    } catch (e) {
      console.error('Error fetching user:', e)
      error.value =
        e instanceof Error
          ? e.message
          : "Une erreur est survenue lors de la récupération de l'utilisateur"
    }
  }

  const getUserAccount = async (userId: string) => {
    try {
      loading.value = true
      const { data } = await getAccount(userId)
      account.value = data
      loading.value = false
    } catch (e) {
      error.value = "Erreur lors de la récupération de l'utilisateur"
      console.error(e)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (signInError) throw signInError

      actualSession.value = data.session
      user.value = data.user
      return data
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Une erreur est survenue lors de la connexion'
      throw e
    } finally {
      loading.value = false
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    actualSession.value = null
    user.value = null
    pendingVerification.value = false
    pendingVerificationEmail.value = ''
  }

  const sendOTP = async (email: string) => {
    try {
      loading.value = true
      error.value = null
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false
        }
      })
      if (signInError) throw signInError
      pendingVerification.value = true
      pendingVerificationEmail.value = email
    } catch (e: any) {
      error.value = e.message || "Erreur lors de l'envoi du code OTP"
      throw e
    } finally {
      loading.value = false
    }
  }

  const verifyOTP = async (token: string) => {
    if (!pendingVerification.value) {
      throw new Error('Aucune vérification en attente')
    }

    try {
      loading.value = true
      error.value = null
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email: pendingVerificationEmail.value,
        token,
        type: 'email'
      })
      if (verifyError) throw verifyError
      user.value = data.user
      actualSession.value = data.session
      pendingVerification.value = false
      pendingVerificationEmail.value = ''
      return data
    } catch (e: any) {
      error.value = e.message || 'Erreur lors de la vérification du code OTP'
      throw e
    } finally {
      loading.value = false
    }
  }

  const clearPendingVerification = () => {
    pendingVerification.value = false
    pendingVerificationEmail.value = ''
  }

  return {
    user,
    account,
    actualSession,
    loading,
    error,
    pendingVerification,
    pendingVerificationEmail,
    fetchUser,
    getUserAccount,
    signIn,
    signOut,
    sendOTP,
    verifyOTP,
    clearPendingVerification
  }
})
