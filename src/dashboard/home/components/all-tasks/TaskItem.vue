<template>
  <div
    class="bg-white cursor-pointer dark:bg-dark-200 border border-gray-200 dark:border-gray rounded-2xl p-2.5 mb-1.5"
  >
    <div class="flex items-center justify-between">
      <p class="text-primary">{{ task.title }}</p>
      <BaseImage
        :image-url="task.createdBy.avatar"
        :image-class="'h-8 w-8 rounded-full border border-primary'"
        :load-class="'h-8 w-8 min-w-8 text-base rounded-full'"
      />
    </div>
    <p class="text-sm my-2.5">{{ task.description }}</p>
    <div class="flex items-center justify-between">
      <BaseRoundedButton>
        <template #btn-content>
          <PhPen size="20" />
        </template>
      </BaseRoundedButton>
      <BaseRoundedButton @button-action="openDeleteModal">
        <template #btn-content>
          <PhTrash class="text-red-primary" size="20" />
        </template>
      </BaseRoundedButton>
    </div>
  </div>
  <BaseDeleteModal
    :show-delete-modal="showDeleteModal"
    :modal-title="'Delete task'"
    :modal-message="'Are you sure you want to delete this task?'"
    @cancel-action="closeDeleteModal"
    @delete-action="deleteTask"
  />
</template>

<script setup>
import { computed } from 'vue'
import BaseImage from '@/components/base/BaseImage.vue'
import BaseRoundedButton from '@/components/base/BaseRoundedButton.vue'
import BaseDeleteModal from '@/components/base/BaseDeleteModal.vue'
import { PhPen, PhTrash } from '@phosphor-icons/vue'
import { useTaskStore } from '@/stores/tasks/tasks'

const props = defineProps({
  task: {
    type: Object,
    default: () => ({}),
  },
})

const taskStore = useTaskStore()

const showDeleteModal = computed(() => taskStore.showDeleteModal)

const openDeleteModal = () => {
  taskStore.openDeletekModal()
}

const closeDeleteModal = () => {
  taskStore.closeDeleteModal()
}

const deleteTask = () => {
  console.log('task deleted')
  closeDeleteModal()
}
</script>
