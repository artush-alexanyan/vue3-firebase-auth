<template>
  <div class="flex flex-col space-y-1.5">
    <label :for="id" class="text-black dark:text-gray-primary text-sm">{{ label }}</label>
    <div class="relative">
      <input
        :class="[getInputClasses, globalClasses, defaultClasses]"
        :placeholder="placeholder"
        :type="type"
        :required="required"
        :disabled="disabled"
        :isError="isError"
        :id="id"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <div
        class="absolute top-1/2 left-2.5 transform -translate-y-1/2"
        :class="isFocused ? 'text-primary' : 'text-gray-500 dark:text-primary-dark-text'"
      >
        <slot name="left-icon"></slot>
      </div>
      <div class="absolute top-1/2 right-2.5 transform -translate-y-1/2">
        <slot name="right-icon"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  label: {
    type: String,
    default: 'Input label',
  },
  id: String,
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: 'Type here...',
  },
  isError: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  globalClasses: {
    type: String,
    default: 'px-10 py-3.5',
  },
})

const isFocused = ref(false)

const getInputClasses = computed(() =>
  props.isError ? 'border-red-600' : 'border-gray-200 dark:border-gray',
)
const defaultClasses = computed(
  () =>
    'border-[1.5px] w-full bg-white dark:bg-dark-100 dark:text-gray-primary !dark:autofill:bg-dark-100 rounded-lg outline-none focus:border-primary placeholder:text-sm',
)
</script>
