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
        <BaseMessage :message="taskMessage" @delete-message="clearTaskMessage" />
      </div>
    </template>
  </BasePageContainer>
</template>
<script setup>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useTaskStore } from '@/stores/tasks/tasks'
import BasePageContainer from '../components/base/BasePageContainer.vue'
import NewTaskButton from './components/new-task/NewTaskButton.vue'
import NewTaskModal from './components/new-task/NewTaskModal.vue'
import TaskBoard from './components/all-tasks/TaskBoard.vue'
import BaseMessage from '@/components/base/BaseMessage.vue'

const authStore = useAuthStore()
const taskStore = useTaskStore()

const taskMessage = computed(() => taskStore.taskMessage)

const clearTaskMessage = () => {
  taskStore.clearTaskMessage()
}

onMounted(() => {
  authStore.checkUserState()
})
</script>
