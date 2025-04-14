import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AuthLogin',
      component: () => import('@/auth/login/AuthLogin.vue'),
    },
    {
      path: '/register',
      name: 'AuthRegister',
      component: () => import('@/auth/register/AuthRegister.vue'),
    },
  ],
})

export default router
