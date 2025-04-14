<template>
  <div class="text-center">
    <p>
      {{ question }}
      <RouterLink
        :to="routePath"
        class="text-primary hover:text-underline transition-all duration-300"
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
