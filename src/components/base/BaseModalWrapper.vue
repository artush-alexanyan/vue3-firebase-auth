<template>
  <div
    v-if="showModal"
    class="z-[70] fixed top-0 left-0 flex items-center justify-center w-full h-screen md:p-3 bg-black/10 dark:bg-white/10"
  >
    <div
      class="zoom-in w-full dark:text-gray-primary relative md:rounded-2xl bg-gray-50 dark:bg-dark-200 border border-gray-200 dark:border-gray text-black dark:text-primary-dark-text overflow-hidden"
      :class="modalClasses"
    >
      <div class="">
        <div
          class="flex items-center justify-between p-5 border-b border-b-gray-200 dark:border-b-gray"
        >
          <p class="md:text-xl">{{ modalTitle }}</p>
          <button type="button" class="cursor-pointer" @click="emit('close-modal')">
            <PhX size="22" />
          </button>
        </div>
        <div>
          <slot name="modal-content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PhX } from '@phosphor-icons/vue'
const emit = defineEmits(['close-modal'])

const props = defineProps({
  showModal: {
    type: Boolean,
    default: true,
  },
  modalTitle: {
    type: String,
    default: 'Modal title',
  },
  modalClasses: {
    type: String,
    default: 'md:w-sm md:h-40 h-screen overflow-y-auto w-full',
  },
})
</script>
