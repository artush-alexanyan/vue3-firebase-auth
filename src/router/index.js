import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AuthLogin',
      component: () => import('@/auth/login/AuthLogin.vue'),
    },
  ],
})

export default router
