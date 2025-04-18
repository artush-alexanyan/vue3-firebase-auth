<template>
  <div class="flex w-full">
    <SidebarLeft />
    <main class="w-full bg-gray-50 dark:bg-dark-200">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import SidebarLeft from './components/sidebar/SidebarLeft.vue'
</script>
