<template>
  <div
    v-if="message"
    :class="messageClass"
    class="fixed min-w-48 left-1/2 transform -translate-x-1/2 bottom-0 rounded text-center text-base text-white"
  >
    <div class="w-full relative p-2.5">
      <span>{{ message.message }}</span>
      <div class="absolute -top-2.5 -right-2.5">
        <button
          @click="emit('delete-message')"
          class="cursor-pointer h-6 w-6 border border-gray-200 dark:border-transparent rounded-full flex items-center justify-center bg-white dark:bg-dark-100 text-black"
        >
          <PhX class="text-gray-600 dark:text-gray-primary" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { PhX } from '@phosphor-icons/vue'

const emit = defineEmits(['delete-message'])

const props = defineProps({
  message: {
    type: Object,
  },
})

const messageClass = computed(() =>
  props.message && props.message.type
    ? props.message.type === 'Error'
      ? 'bg-red-primary'
      : 'bg-primary-green'
    : '',
)
</script>
