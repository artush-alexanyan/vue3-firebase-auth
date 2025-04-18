<template>
  <div class="p-5 w-full h-screen overflow-y-auto">
    <BaseTitle :titleClass="'text-left'" :title="title" />
    <slot name="page-content"></slot>
  </div>
</template>

<script setup>
import BaseTitle from '@/components/base/BaseTitle.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Page title',
  },
})
</script>
