<template>
  <aside
    class="w-44 h-screen border-r border-r-gray-200 bg-white dark:bg-dark-200 dark:border-r-dark-100 flex flex-col justify-between"
  >
    <div class="">
      <div class="flex items-center px-5 py-3 text-lg">
        <p class="text-xl">Dashboard</p>
      </div>
      <ul>
        <li
          class="py-4 px-5 flex items-center space-x-2.5 cursor-pointer"
          :class="navLink.title === defaultTab ? 'text-primary' : ''"
          @click="changeNav(navLink)"
          v-for="navLink in navLinks"
          :key="navLink.id"
        >
          <component class="text-2xl" :is="navLink.icon"></component>
          <span class="text-lg">{{ navLink.title }}</span>
        </li>
      </ul>
    </div>
    <div class="flex items-center justify-center pb-10">
      <div class="flex flex-col items-center space-y-5">
        <BaseMode />
        <SidebarSignoutButton />
      </div>
    </div>
  </aside>
</template>

<script setup>
import { PhGearSix, PhHouse, PhUser } from '@phosphor-icons/vue'
import { ref, shallowRef, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SidebarSignoutButton from './SidebarSignoutButton.vue'
import BaseMode from '@/components/base/BaseMode.vue'

const defaultTab = ref('Home')
const router = useRouter()
const navLinks = shallowRef([
  { id: 1, icon: PhHouse, title: 'Home', routePath: '/dashboard' },
  { id: 2, icon: PhUser, title: 'Account', routePath: '/dashboard/account' },
  { id: 3, icon: PhGearSix, title: 'Tasks', routePath: '/dashboard/tasks' },
])

const changeNav = (item) => {
  defaultTab.value = item.title
  localStorage.setItem('currentTab', defaultTab.value)
  router.push({ path: item.routePath })
}
onMounted(() => {
  const getCurrentTab = localStorage.getItem('currentTab')
  if (getCurrentTab) {
    defaultTab.value = getCurrentTab
  } else {
    localStorage.setItem('currentTab', defaultTab.value)
  }
})
</script>
