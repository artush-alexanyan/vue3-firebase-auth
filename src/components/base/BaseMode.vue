<template>
  <BaseRoundedButton @button-action="toggleDark()">
    <template #btn-content>
      <PhSun v-if="isDark" size="20" />
      <PhMoon v-else size="20" />
    </template>
  </BaseRoundedButton>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'
import { PhMoon, PhSun } from '@phosphor-icons/vue'
import { onMounted } from 'vue'
import BaseRoundedButton from './BaseRoundedButton.vue'

const isDark = useDark({
  defaultValue: true,
})
const toggleDark = useToggle(isDark)

onMounted(() => {
  const visited = localStorage.getItem('visited')
  if (!visited) {
    toggleDark()
    localStorage.setItem('visited', 'visited')
  }
})
</script>
