<template>
  <button
    :class="[shapes, isActive ? 'text-primary' : 'text-primary-dark-text']"
    class="cursor-pointer rounded-full flex items-center justify-center bg-primary-green/12.5 text-primary-green dark:bg-dark-light"
    type="button"
    @click="emit('button-action')"
  >
    <slot name="btn-content"></slot>
  </button>
</template>

<script setup>
const emit = defineEmits(['button-action'])

const props = defineProps({
  shapes: {
    type: String,
    default: 'h-9 w-9 min-w-9',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
})
</script>
