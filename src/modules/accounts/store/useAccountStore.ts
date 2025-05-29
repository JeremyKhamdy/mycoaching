import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAccountService } from '../services/useAccountService'
import type { Account } from '../models/Account'
import { POSITION, useToast } from 'vue-toastification'

export const useAccountStore = defineStore('account', () => {
  // Initialisation de toast notification pour les messages
  const toast = useToast()

  // Initialisation des states du store
  const account = ref<Account | null>(null)
  const accounts = ref<Account[] | null>([])
  const loading = ref(false)

  // Récupération des méthodes du service.
  const { getAccount, getAccounts, postAccount, patchAccount } = useAccountService()

  // Récupération des methodes du service en lien pour les getters et actions.

  const fetchAccount = async (userId: string) => {
    // Notifier le store qu'un chargement est en cours.
    loading.value = true
    try {
      // Récupération du compte de l'utilisateur avec la méthode du service en lien.
      const { data } = await getAccount(userId)

      // Mis à jour des states du store.
      account.value = data as Account
    } catch (error) {
      console.error('Error fetching accounts:', error)

      // Affichage du message d'erreur.
      toast.error(error, { position: POSITION.BOTTOM_RIGHT })
    } finally {
      // Notifier le store que le chargement est fini.
      loading.value = false

      // Affichage du message de succès.
      toast.success(`Le compte de l'utilisateur a bien été récupéré`, {
        position: POSITION.BOTTOM_RIGHT
      })
    }
  }

  const fetchAccounts = async () => {
    // Notifier le store qu'un chargement est en cours.
    loading.value = true
    try {
      // Récupération de tous les comptes.
      const { data } = await getAccounts()

      // Mis à jour des states du store.
      accounts.value = data
    } catch (error) {
      console.error('Error fetching accounts:', error)

      // Affichage du message d'erreur.
      toast.error(`Erreur : ${error}`, {
        position: POSITION.BOTTOM_RIGHT
      })
    } finally {
      // Notifier le store que le chargement est fini.
      loading.value = false

      // Affichage du message de succès.
      toast.success('Liste des comptes bien récupérés', {
        position: POSITION.BOTTOM_RIGHT
      })
    }
  }

  const createAccount = async (accountData: Partial<Account>, email: string, userId: string) => {
    // Notifier le store qu'un chargement est en cours.
    loading.value = true
    try {
      // Utilisation de la méthode post du service en lien pour créer un compte lors de la première connexion.
      const { data } = await postAccount(accountData, email, userId)

      // Mis à jour des states du store.
      account.value = data
    } catch (error) {
      console.error('Error fetching accounts:', error)

      // Affichage du message d'erreur.
      toast.error(`Erreur : ${error}`, {
        position: POSITION.BOTTOM_RIGHT
      })
    } finally {
      // Notifier le store que le chargement est fini.
      loading.value = false

      // Affichage du message de succès.
      toast.success('Les informations de votre compte on bien été pris en compte', {
        position: POSITION.BOTTOM_RIGHT
      })
    }
  }

  const updateAccount = async (accountId: number, accountData: Partial<Account>) => {
    // Notifier le store qu'un chargement est en cours.
    loading.value = true

    try {
      // Utilisation de la méthode patch du service en lien, pour mettre à jour le compte d'un utlisateur.
      const { data } = await patchAccount(accountId, accountData)

      // Si la liste des comptes n'est pas vide/null, retirer et ajouter le compte à jour.
      if (accounts.value) {
        const index = accounts.value?.findIndex((a) => a.id === accountId)
        if (index !== -1) {
          accounts.value[index] = data as Account
        }
      }
    } catch (error) {
      console.error('Error fetching accounts:', error)

      // Affichage du message d'erreur.
      toast.error(`Erreur : ${error}`, {
        position: POSITION.BOTTOM_RIGHT
      })
    } finally {
      // Notifier le store que le chargement est fini.
      loading.value = false

      // Affichage du message de succès.
      toast.success('Le compte a bien été mis à jour.', {
        position: POSITION.BOTTOM_RIGHT
      })
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
