<template>
  <BaseRoundedButton @button-action="openNewtaskModal">
    <template #btn-content>
      <PhPlus size="24" />
    </template>
  </BaseRoundedButton>
</template>

<script setup>
import BaseRoundedButton from '@/components/base/BaseRoundedButton.vue'
import { useTaskStore } from '@/stores/tasks/tasks'
import { PhPlus } from '@phosphor-icons/vue'

const taskStore = useTaskStore()

const openNewtaskModal = () => {
  taskStore.openNewtaskModal()
}
</script>
