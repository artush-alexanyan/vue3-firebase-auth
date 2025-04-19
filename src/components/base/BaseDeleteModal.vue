<template>
  <BaseModalWrapper
    :modal-classes="'w-lg h-auto'"
    :modal-title="modalTitle"
    :show-modal="showDeleteModal"
    @close-modal="emit('cancel-action')"
  >
    <template #modal-content>
      <div class="p-5">
        <p class="text-center">
          {{ modalMessage }}
        </p>
        <div class="flex items-center jutsify-between gap-x-10 mt-5">
          <BaseButton
            @button-action="emit('cancel-action')"
            :label="'Cancel'"
            :btn-class="'bg-primary-green hover:bg-green-600 text-white'"
          />
          <BaseButton
            @button-action="emit('delete-action')"
            :label="'Delete task'"
            :btn-class="'bg-red-primary hover:bg-red-600 text-white'"
          />
        </div>
      </div>
    </template>
  </BaseModalWrapper>
</template>

<script setup>
import BaseButton from './BaseButton.vue'
import BaseModalWrapper from './BaseModalWrapper.vue'

const emit = defineEmits(['cancel-action', 'delete-action'])

const props = defineProps({
  showDeleteModal: {
    type: Boolean,
    default: false,
  },
  modalMessage: {
    type: String,
    default: 'Are you sure you want to delete this item?',
  },
  modalTitle: {
    type: String,
    default: 'Delete item',
  },
})
</script>
