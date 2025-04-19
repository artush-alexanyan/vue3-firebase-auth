<template>
  <button
    :disabled="disabled"
    :loading="loading"
    :name="name"
    :class="[btnClass, disabled ? 'cursor-not-allowed' : 'cursor-pointer']"
    class="flex w-full items-center justify-center px-5 py-3.5 space-x-2 transition-all duration-300 rounded-lg"
    :type="type"
    @click="emit('button-action')"
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
  btnClass: {
    type: String,
    default: 'bg-primary text-black hover:bg-amber-400',
  },
})
</script>
