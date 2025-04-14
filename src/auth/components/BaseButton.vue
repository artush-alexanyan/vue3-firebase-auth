<template>
  <button
    :disabled="disabled"
    :loading="loading"
    :name="name"
    :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
    class="flex items-center justify-center px-5 py-2.5 w-full space-x-2 bg-primary text-white hover:bg-amber-400 transition-all duration-300 rounded-lg"
    :type="type"
  >
    <span>{{ label }}</span>
    <PhCircleNotch v-if="loading" size="20" class="animate-spin" />
  </button>
</template>

<script setup>
import { PhCircleNotch } from '@phosphor-icons/vue'

const emit = defineEmits(['button-action'])

const props = defineProps({
  label: {
    type: String,
    default: 'Button label',
  },
  name: String,
  type: {
    type: String,
    default: 'button',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>
