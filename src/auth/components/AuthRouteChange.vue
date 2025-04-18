<template>
  <div class="text-center">
    <p>
      {{ question }}
      <RouterLink
        :to="routePath"
        class="text-secondary-green hover:underline transition-all duration-300"
      >
        {{ actionName }}
      </RouterLink>
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  question: String,
  routePath: String,
  actionName: String,
})
</script>
