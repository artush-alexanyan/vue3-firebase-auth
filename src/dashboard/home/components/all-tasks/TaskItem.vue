<template>
  <div
    class="bg-white cursor-pointer dark:bg-dark-200 border border-gray-200 dark:border-gray rounded-2xl p-2.5"
  >
    <p class="text-primary">{{ task.title }}</p>
    <p class="text-sm my-2.5">{{ task.description }}</p>
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-1.5">
        <BaseImage
          :image-url="task.createdBy.avatar"
          :image-class="'h-8 w-8 rounded-full border border-primary'"
          :load-class="'h-8 w-8 min-w-8 text-base rounded-full'"
        />
        <p class="italic text-gray-500 dark:text-gray-secondary text-xs">
          {{ task.createdBy.email }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseImage from '@/components/base/BaseImage.vue'

const props = defineProps({
  task: {
    type: Object,
    default: () => ({}),
  },
})
</script>
