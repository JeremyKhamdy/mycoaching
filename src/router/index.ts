import { createRouter, createWebHistory } from 'vue-router'
import { accountsRoute } from '@/modules/accounts/router/route'
import { useAuthStore } from '@/modules/auth/store/useAuthStore'
import LoginView from '@/modules/auth/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: true },
      // component: () => import('../shared/views/HomeView.vue'),
      children: [
        accountsRoute,
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: { requiresAuth: true },
          component: () => import('../shared/views/HomeView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: { requiresAuth: false },
      component: LoginView
    }
  ]
})

// Garde de navigation
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  // Vérifier l'état de l'authentification si nécessaire
  if (authStore.user === null) {
    await authStore.fetchUser()
  }

  // Gérer les redirections
  if (requiresAuth && !authStore.user) {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    next({
      name: 'login',
      query: { redirect: to.fullPath } // Sauvegarder la route cible
    })
  } else if (to.name === 'login' && authStore.user) {
    // Rediriger vers la page d'accueil si l'utilisateur est déjà connecté
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
