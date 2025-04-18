<template>
  <div class="flex flex-col space-y-1.5">
    <label :for="id" class="text-black dark:text-gray-primary text-sm">{{ label }}</label>
    <textarea
      :id="id"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :class="[textareaClass, textAreaClasses]"
      :value="modelValue"
      @input="updateModelValue"
      type="text"
      :rows="rows"
    ></textarea>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const emit = defineEmits(['update:modelValue'])

const updateModelValue = (e) => {
  emit('update:modelValue', e.target.value)
}

const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: '',
  },
  label: {
    type: String,
    default: 'Input Label',
  },
  textareaClass: {
    type: String,
    default: 'w-full',
  },
  placeholder: {
    type: String,
    default: 'Type here...',
  },
  id: {
    type: String,
    default: 'baseInput',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: true,
  },
  rows: {
    type: Number,
    default: 3,
  },
})

const textAreaClasses = computed(
  () =>
    'border border-gray-300 w-full px-5 py-2.5 bg-white dark:bg-dark-100 dark:text-gray-primary dark:text-primary-dark-text dark:border-transparent text-base rounded-lg focus:outline-none placeholder:text-base focus:border-primary',
)
</script>
