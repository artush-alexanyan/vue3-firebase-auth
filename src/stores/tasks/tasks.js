import { defineStore } from 'pinia'
import { useCrudStore } from '../crud/crud'
import { useUtilStore } from '../utils/utils'

export const useTaskStore = defineStore('TaskStore', {
  state: () => ({
    showDeleteModal: false,
    showNewTaskModal: false,
    taskSaving: false,
    taskFetching: false,
    tasks: [],
    taskMessage: null,
  }),
  actions: {
    openNewtaskModal(data) {
      this.showNewTaskModal = true
    },
    closeNewTaskModal() {
      this.showNewTaskModal = false
    },
    openDeletekModal(data) {
      this.showDeleteModal = true
    },
    closeDeleteModal() {
      this.showDeleteModal = false
    },
    clearTaskMessage() {
      this.taskMessage = null
    },
    async addNewTask(data) {
      const crudStore = useCrudStore()
      const utilStore = useUtilStore()
      const newDocId = utilStore.generateFirebaseId()
      data.id = newDocId
      this.taskSaving = true
      try {
        await crudStore.addNewDocument(data, 'tasks', newDocId)
        const openTaskGroup = this.tasks.find((group) => group.name === 'Open')
        openTaskGroup.tasks.push(data)
        this.showNewTaskModal = false
        const utilStore = useUtilStore()
        this.taskMessage = utilStore.formatFirebaseMessage(
          'A new task saved successfully',
          'Success',
        )
      } catch (error) {
        this.taskMessage = utilStore.formatFirebaseMessage(error.message, 'Error')
      } finally {
        this.taskSaving = false
      }
    },

    async fetchAllTasks() {
      const crudStore = useCrudStore()
      const utilStore = useUtilStore()

      const statusGroups = [
        { id: 1, name: 'Open', key: 'open', tasks: [] },
        { id: 2, name: 'In Progress', key: 'in_progress', tasks: [] },
        { id: 3, name: 'Review', key: 'review', tasks: [] },
        { id: 4, name: 'Completed', key: 'completed', tasks: [] },
      ]

      try {
        this.taskFetching = true
        const taskData = await crudStore.getCollectionItems('tasks')

        taskData.forEach((task) => {
          const group = statusGroups.find((s) => s.key === task.status)
          if (group) {
            group.tasks.push(task)
          }
        })

        this.tasks = statusGroups
        this.taskMessage = utilStore.formatFirebaseMessage('Tasks fetched successfully', 'Success')
        setTimeout(() => {
          this.clearTaskMessage()
        }, 2500)
      } catch (error) {
        console.log('error', error)
        console.log('typof error', typeof error)
        this.taskMessage = utilStore.formatFirebaseMessage(error.message, 'Error')
      } finally {
        this.taskFetching = false
      }
    },
  },
})
