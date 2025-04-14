<template>
  <h1 :class="classes" class="lg:text-5xl md:text-4xl sm:text-3xl text-2xl">{{ title }}</h1>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Title',
  },
  classes: {
    type: String,
    default: 'text-center',
  },
})
</script>
