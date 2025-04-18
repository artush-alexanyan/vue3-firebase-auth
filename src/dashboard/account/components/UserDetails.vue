<template>
  <div class="flex flex-col space-y-5">
    <p>
      <strong>Name:</strong>
      {{ getUserName }}
    </p>
    <p><strong>UID:</strong> {{ user.uid }}</p>

    <p><strong>Email:</strong> {{ user.email }}</p>
    <p><strong>Email Verified:</strong> {{ user.emailVerified }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  user: {
    type: Object,
    default: () => ({}),
  },
})

const getUserName = computed(() => props.user?.displayName || 'Unknown User')
</script>
