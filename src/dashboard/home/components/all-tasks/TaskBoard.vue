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
                  class="dragArea list-group min-h-[120px]"
                  :list="group.tasks"
                  item-key="id"
                  :group="{ name: 'tasks' }"
                >
                  <template #item="{ element }">
                    <div class="list-group-item cursor-drag">
                      <TaskItem class="mb-1" :task="element" />
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
import { ref, onMounted } from 'vue'
import BaseLoader from '@/components/base/BaseLoader.vue'
import TaskItem from './TaskItem.vue'
import { useCrudStore } from '@/stores/crud/crud'
import Draggable from 'vuedraggable'

const crudStore = useCrudStore()

const tasks = ref([])
const taskFetching = ref(false)

const handleTaskMove = (newStatus) => async (event) => {
  if (event.added?.element) {
    const task = event.added.element
    task.status = newStatus
    console.log(`Task "${task.id}" moved to status "${newStatus}"`)
    await crudStore.updateTaskStatus('tasks', task.id, newStatus)
    console.log(`Task "${task.id}" status updated to"${newStatus}"`)
  }
}

const fetchAllTasks = async () => {
  const statusGroups = [
    { id: 1, name: 'Open', key: 'open', tasks: [] },
    { id: 2, name: 'In Progress', key: 'in_progress', tasks: [] },
    { id: 3, name: 'Review', key: 'review', tasks: [] },
    { id: 4, name: 'Completed', key: 'completed', tasks: [] },
  ]

  try {
    taskFetching.value = true
    const taskData = await crudStore.getCollectionItems('tasks')

    taskData.forEach((task) => {
      const group = statusGroups.find((s) => s.key === task.status)
      if (group) {
        group.tasks.push(task)
      }
    })

    tasks.value = statusGroups
  } catch (error) {
    console.error('error fetching tasks', error)
  } finally {
    taskFetching.value = false
  }
}

onMounted(async () => {
  await fetchAllTasks()
})
</script>
