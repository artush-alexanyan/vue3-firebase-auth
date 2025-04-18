<template>
  <BasePageContainer :title="''">
    <template #page-content>
      <NewTaskModal />
      <div>
        <div class="flex items-center space-x-2">
          <span>Add new task</span>
          <NewTaskButton />
        </div>
        <TaskBoard />
      </div>
    </template>
  </BasePageContainer>
</template>
<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import BasePageContainer from '../components/base/BasePageContainer.vue'
import NewTaskButton from './components/new-task/NewTaskButton.vue'
import NewTaskModal from './components/new-task/NewTaskModal.vue'
import TaskBoard from './components/all-tasks/TaskBoard.vue'

const authStore = useAuthStore()

onMounted(() => {
  authStore.checkUserState()
})
</script>
