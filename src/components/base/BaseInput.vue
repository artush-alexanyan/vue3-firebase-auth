<template>
  <div class="flex flex-col space-y-1.5">
    <label :for="id" class="text-gray-600 dark:text-primary-dark-text text-sm">{{ label }}</label>
    <div class="relative">
      <input
        class="border-[1.5px] w-full px-10 py-2.5 bg-white dark:bg-dark-light rounded-lg outline-none focus:border-primary placeholder:text-sm"
        :class="getInputClasses"
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
        :class="isFocused ? 'text-primary' : 'text-black dark:text-primary-dark-text'"
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
})

const isFocused = ref(false)

const getInputClasses = computed(() =>
  props.isError ? 'border-red-600' : 'border-gray-300 dark:border-darker',
)
</script>
