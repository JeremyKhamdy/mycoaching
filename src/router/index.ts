import { createRouter, createWebHistory } from 'vue-router'
import { accountsRoute } from '@/modules/accounts/router/route'
import { useAuthStore } from '@/modules/auth/store/useAuthStore'
import LoginView from '@/modules/auth/views/LoginView.vue'
import VerifyOTPView from '@/modules/auth/views/VerifyOTPView.vue'

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
    },
    {
      path: '/verify-otp',
      name: 'verify-otp',
      meta: { requiresAuth: false },
      component: VerifyOTPView
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
  console.log(authStore.pendingVerification)
  // Gérer les redirections
  if (requiresAuth && !authStore.user) {
    console.log('need login')

    // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    next({
      name: 'login'
      // query: { redirect: to.fullPath }
    })
  } else if ((requiresAuth || to.name === 'login') && authStore.pendingVerification) {
    console.log('otp route')
    next({ name: 'verify-otp' })
  } else if (to.name === 'verify-otp' && !authStore.pendingVerification) {
    console.log('ici')
    // Rediriger vers la page home si aucune vérification n'est en attente
    next({ name: 'dashboard' })
  } else if (to.name === 'login' && authStore.user) {
    // Rediriger vers la page d'accueil si l'utilisateur est déjà connecté
    next({ name: 'dashboard' })
  } else {
    console.log('next')
    next()
  }
})

export default router
