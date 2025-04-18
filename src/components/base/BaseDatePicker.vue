<template>
  <VueDatePicker
    :value="date"
    @internal-model-change="emit('update:x', $event.target.value)"
  ></VueDatePicker>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const emit = defineEmits('update:x')

const props = defineProps({
  date: {
    type: Date,
    default: new Date(),
  },
})
</script>
