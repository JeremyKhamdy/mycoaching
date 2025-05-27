import { supabase } from '@/shared/services/supabaseClient'
import type { Session, User } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const actualSession = ref<Session | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

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
  }

  return {
    fetchUser,
    signIn,
    signOut,
    user,
    actualSession,
    loading,
    error
  }
})
