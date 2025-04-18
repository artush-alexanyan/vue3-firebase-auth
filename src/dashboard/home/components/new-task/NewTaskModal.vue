<template>
  <BaseModalWrapper
    :modal-classes="'w-lg'"
    :show-modal="showNewTaskModal"
    :modal-title="'Add new task'"
    @close-modal="closeNewTaskModal"
  >
    <template #modal-content>
      <form @submit.prevent="addNewTask" class="flex flex-col space-y-7 p-5">
        <div ref="categoryRef">
          <BaseDropDown
            :label="category ? category : 'Select category'"
            :items="categories"
            :show-search="false"
            :content-class="'h-48 overflow-y-auto'"
            :show-dropdown-content="showCategories"
            @toggle-dropdown="toggleCategories"
            @select-item="selectCategory"
          >
            <template #dropdownItem="{ item }">
              <span>{{ item.title }}</span>
            </template></BaseDropDown
          >
        </div>
        <BaseInput
          v-model="creatorName"
          :disabled="true"
          :global-classes="'px-5 py-3.5'"
          :placeholder="''"
          :label="'Created by'"
        />
        <BaseInput
          v-model="title"
          :global-classes="'px-5 py-3.5'"
          :placeholder="'Enter title (e.g. Design homepage banner)'"
          :label="'Task title'"
        />
        <BaseTextArea
          v-model="description"
          :id="'taskDescription'"
          :label="'Task description'"
          :placeholder="'Enter a short description (e.g. Create a responsive hero section with call-to-action button)'"
        />
        <VueDatePicker v-model="dueDate" ref="dp">
          <template #action-buttons>
            <button
              @click="selectDate"
              type="button"
              class="cursor-pointer text-center px-5 py-2 text-sm !bg-primary text-black hover:bg-amber-400 transition-all duration-300 rounded-lg"
            >
              Select
            </button>
          </template>
        </VueDatePicker>
        <BaseButton :type="'submit'" :label="'Save task'" :loading="taskSaving" />
      </form>
    </template>
  </BaseModalWrapper>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useTaskStore } from '@/stores/tasks/tasks'
import BaseModalWrapper from '@/components/base/BaseModalWrapper.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseTextArea from '@/components/base/BaseTextArea.vue'
import BaseDropDown from '@/components/base/BaseDropDown.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useAuthStore } from '@/stores/auth'

const taskStore = useTaskStore()
const authStore = useAuthStore()

const showNewTaskModal = computed(() => taskStore.showNewTaskModal)
const creatorName = computed(() => authStore?.user?.displayName || 'Not name')
const createdBy = computed(() => authStore?.user || {})

const title = ref('')
const description = ref('')
const dp = ref(null)
const dueDate = ref(new Date())
const category = ref('')
const showCategories = ref(false)
const categoryRef = ref(null)

const categories = ref([
  { id: 1, title: 'Frontend Development', key: 'frontend_dev' },
  { id: 2, title: 'Backend Development', key: 'backend_dev' },
  { id: 3, title: 'DevOps & Deployment', key: 'devops' },
  { id: 4, title: 'UI/UX Design', key: 'ui_ux' },
  { id: 5, title: 'Database Management', key: 'database_mgmt' },
  { id: 6, title: 'API Integration', key: 'api_integration' },
  { id: 7, title: 'Mobile Development', key: 'mobile_dev' },
  { id: 8, title: 'Testing & QA', key: 'testing_qa' },
  { id: 9, title: 'Security & Compliance', key: 'security' },
  { id: 10, title: 'Project Management', key: 'project_mgmt' },
])

const taskSaving = computed(() => taskStore.taskSaving)

const toggleCategories = () => {
  showCategories.value = !showCategories.value
}

const selectCategory = (item) => {
  category.value = item.key
  showCategories.value = false
}

const selectDate = () => {
  dp.value.selectDate()
}

const addNewTask = async () => {
  const taskData = {
    title: title.value,
    description: description.value,
    dueDate: dueDate.value,
    createdAt: new Date(),
    category: category.value,
    status: 'open',
    assignedTo: null,
    assignedBy: null,
    createdBy: createdBy.value,
  }
  await taskStore.addNewTask(taskData)
}

onClickOutside(categoryRef, () => (showCategories.value = false))

const closeNewTaskModal = () => {
  taskStore.closeNewTaskModal()
}
</script>

<style></style>
