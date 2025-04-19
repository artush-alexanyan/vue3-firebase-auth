<template>
  <div>
    <div>
      <div class="flex items-center justify-center h-screen" v-if="taskFetching">
        <BaseLoader />
      </div>
      <div v-else>
        <div v-if="tasks.length > 0">
          <div class="mt-5 md:grid xl:grid-cols-4 md:grid-cols-2 hidden gap-5">
            <div v-for="group in tasks" :key="group.id" class="task-column min-w-full">
              <div class="bg-gray-100 dark:bg-dark-100 p-1 rounded-2xl">
                <h3 class="text-primary-green py-2.5 text-center">{{ group.name }}</h3>
                <draggable
                  @change="(event) => handleTaskMove(group.key)(event)"
                  class="dragArea list-group"
                  :list="group.tasks"
                  item-key="id"
                  :group="{ name: 'tasks' }"
                >
                  <template #item="{ element }">
                    <div class="list-group-item cursor-drag">
                      <TaskItem :task="element" />
                    </div>
                  </template>

                  <template #footer>
                    <div
                      v-if="!group.tasks.length"
                      class="text-gray-500 italic text-sm text-center py-3"
                    >
                      No tasks here
                    </div>
                  </template>
                </draggable>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="text-center">No task found</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useCrudStore } from '@/stores/crud/crud'
import { useTaskStore } from '@/stores/tasks/tasks'
import BaseLoader from '@/components/base/BaseLoader.vue'
import TaskItem from './TaskItem.vue'
import Draggable from 'vuedraggable'

const crudStore = useCrudStore()
const taskStore = useTaskStore()

const tasks = computed(() => taskStore.tasks)
const taskFetching = computed(() => taskStore.taskFetching)

const handleTaskMove = (newStatus) => async (event) => {
  if (event.added?.element) {
    const task = event.added.element
    task.status = newStatus
    console.log(`Task "${task.id}" moved to status "${newStatus}"`)
    await crudStore.updateTaskStatus('tasks', task.id, newStatus)
    console.log(`Task "${task.id}" status updated to"${newStatus}"`)
  }
}

onMounted(async () => {
  await taskStore.fetchAllTasks()
})
</script>
