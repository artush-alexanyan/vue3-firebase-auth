<template>
  <div :class="containerClass">
    <AuthHeader />
    <div class="w-sm text-black dark:text-gray-primary border-gray-200 p-5 rounded-lg">
      <slot name="auth-content"></slot>
    </div>
  </div>
</template>

<script setup>
import AuthHeader from './AuthHeader.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Title',
  },
  containerClass: {
    type: String,
    default:
      'flex items-center justify-center h-screen md:p-0 p-3 relative bg-gray-50 dark:bg-dark-200',
  },
})
</script>
