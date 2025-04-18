<template>
  <div class="">
    <div class="container">
      <div class="" v-if="taskFetching">
        <BaseLoader />
      </div>
      <div class="" v-else>
        <div class="" v-if="tasks.length > 0">
          <ul>
            <li v-for="task in tasks" :key="task.id">
              {{ task.title }}
            </li>
          </ul>
        </div>
        <div class="" v-else>
          <p class="text-center">No task found</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useTaskStore } from '@/stores/tasks/tasks'
import BaseLoader from '@/components/base/BaseLoader.vue'

const taskStore = useTaskStore()

const tasks = computed(() => taskStore.tasks)
const taskFetching = computed(() => taskStore.taskFetching)

onMounted(async () => {
  await taskStore.fetchAllTasks()
})
</script>
