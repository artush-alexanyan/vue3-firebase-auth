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
    {
      path: '/dashboard',
      name: 'AppDashboard',
      component: () => import('@/dashboard/AppDashboard.vue'),
      children: [
        {
          path: '',
          name: 'HomeDashboard',
          component: () => import('@/dashboard/home/HomeDashboard.vue'),
        },
        {
          path: '/dashboard/account',
          name: 'UserAccount',
          component: () => import('@/dashboard/account/UserAccount.vue'),
        },
        {
          path: '/dashboard/tasks',
          name: 'UserTasks',
          component: () => import('@/dashboard/tasks/UserTasks.vue'),
        },
      ],
    },
  ],
})

export default router
