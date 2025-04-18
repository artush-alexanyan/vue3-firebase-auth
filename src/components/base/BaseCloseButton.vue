<template>
  <button :disabled="disabled" :title="title" :name="name" :type="type" :class="btnClass">
    <PhX class="hover:rotate-90 transform-gpu transition-all duration-300" size="18" />
  </button>
</template>

<script setup>
import { PhX } from '@phosphor-icons/vue'

const props = defineProps({
  btnClass: {
    type: String,
    default:
      ' size-10 rounded-full border border-gray-200 dark:border-none dark:bg-dark-100 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300 cursor-pointer',
  },
  type: {
    type: String,
    default: 'button',
  },
  name: {
    type: String,
    default: 'Close',
  },
  title: {
    type: String,
    default: 'Close',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>
