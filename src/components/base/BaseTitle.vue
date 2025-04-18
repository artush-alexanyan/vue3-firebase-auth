<template>
  <h1 :class="titleClass" class="md:text-4xl sm:text-3xl text-2xl">{{ title }}</h1>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Title',
  },
  titleClass: {
    type: String,
    default: 'text-center',
  },
})
</script>
