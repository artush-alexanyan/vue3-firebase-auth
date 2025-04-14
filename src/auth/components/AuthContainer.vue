<template>
  <div :class="classes">
    <AuthHeader />
    <div
      class="w-md bg-white dark:bg-dark-secondary text-black dark:text-white border-gray-200 p-5 rounded-lg"
    >
      <div class="flex items-center justify-center mb-2.5">
        <BaseLogo />
      </div>
      <slot name="auth-content"></slot>
    </div>
  </div>
</template>

<script setup>
import BaseLogo from '@/components/base/BaseLogo.vue'
import AuthHeader from './AuthHeader.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Title',
  },
  classes: {
    type: String,
    default:
      'flex items-center justify-center h-screen md:p-0 p-3 relative bg-gray-50 dark:bg-dark',
  },
})
</script>
