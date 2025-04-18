import { defineStore } from 'pinia'
import { useCrudStore } from '../crud/crud'
import { useUtilStore } from '../utils/utils'

export const useTaskStore = defineStore('TaskStore', {
  state: () => ({
    showNewTaskModal: false,
    taskSaving: false,
    taskFetching: false,
    tasks: [],
  }),
  actions: {
    openNewtaskModal(data) {
      this.showNewTaskModal = true
    },
    closeNewTaskModal() {
      this.showNewTaskModal = false
    },
    async addNewTask(data) {
      const crudStore = useCrudStore()
      const utilStore = useUtilStore()
      const newDocId = utilStore.generateFirebaseId()
      data.id = newDocId
      this.taskSaving = true
      try {
        await crudStore.addNewDocument(data, 'tasks', newDocId)
        this.tasks.push(data)
        this.showNewTaskModal = false
      } catch (error) {
        console.error(error)
      } finally {
        this.taskSaving = false
      }
    },
    async fetchAllTasks() {
      const crudStore = useCrudStore()

      try {
        this.taskFetching = true
        const taskData = await crudStore.getCollectionItems('tasks')
        this.tasks = taskData
      } catch (error) {
        console.error('error fetching tasks', error)
      } finally {
        this.taskFetching = false
      }
    },
  },
})
