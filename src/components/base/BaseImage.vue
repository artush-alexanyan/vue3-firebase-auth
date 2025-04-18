<template>
  <UseImage :class="imageClass" :alt="alt" :src="imageUrl">
    <template #loading>
      <div
        :class="loadClass"
        class="bg-gray-100 dark:bg-dark-100 flex items-center justify-center animate-pulse text-primary"
      >
        <PhCircleNotch class="animate-spin" />
      </div>
    </template>

    <template #error>
      <div
        :class="loadClass"
        class="text-gray-400 dark:text-gray-primary bg-gray-100 dark:bg-dark-100 flex items-center justify-center"
      >
        <PhImageBroken />
      </div>
    </template>
  </UseImage>
</template>
<script setup>
import { PhCircleNotch, PhImageBroken } from '@phosphor-icons/vue'
import { UseImage } from '@vueuse/components'

const props = defineProps({
  imageUrl: {
    type: String,
    default: null,
  },
  imageClass: {
    type: String,
    default: 'h-20 object-contain',
  },
  alt: {
    type: String,
    default: 'Image',
  },
  loadClass: {
    type: String,
    default: 'h-20 w-20 min-w-20 text-3xl',
  },
})
</script>
