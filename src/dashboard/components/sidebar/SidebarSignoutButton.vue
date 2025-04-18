<template>
  <BaseRoundedButton @button-action="userSignout">
    <template #btn-content>
      <PhCircleNotch v-if="signingOut" size="22" class="animate-spin" />
      <PhSignOut size="24" v-else />
    </template>
  </BaseRoundedButton>
</template>

<script setup>
import { computed } from 'vue'
import BaseRoundedButton from '@/components/base/BaseRoundedButton.vue'
import { useAuthStore } from '@/stores/auth'
import { PhCircleNotch, PhSignOut } from '@phosphor-icons/vue'

const authStore = useAuthStore()

const signingOut = computed(() => authStore.signingOut)

const userSignout = async () => {
  await authStore.signOutUser()
}
</script>
