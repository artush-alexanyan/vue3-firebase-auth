<template>
  <AuthContainer>
    <template #auth-content>
      <BaseMessage :message="authMessage" @delete-message="clearAuthMessage" />
      <BaseTitle :title="'Join us'" />
      <form @submit.prevent="submitRegister" class="mt-5 flex flex-col space-y-3.5">
        <BaseInput
          v-model="username"
          :disabled="regiterLoading"
          :id="'regiterUsernameInput'"
          :label="'Your name'"
          :type="'text'"
          :placeholder="'Enter your name'"
        >
          <template #left-icon>
            <PhUser size="24" />
          </template>
        </BaseInput>
        <BaseInput
          v-model="email"
          :disabled="regiterLoading"
          :id="'regiterEmailInput'"
          :label="'Your account email'"
          :type="'email'"
          :placeholder="'Enter your email'"
        >
          <template #left-icon>
            <PhAt size="24" />
          </template>
        </BaseInput>
        <BaseInput
          v-model="password"
          :disabled="regiterLoading"
          :id="'regiterPasswordInput'"
          :label="'Your password'"
          :type="'password'"
          :placeholder="'Enter your password'"
        >
          <template #left-icon>
            <PhPassword size="24" />
          </template>
        </BaseInput>
        <BaseButton
          :type="'submit'"
          :disabled="regiterLoading"
          :label="'Regiter account'"
          :loading="regiterLoading"
        />
      </form>
      <AuthRouteChange
        class="mt-2.5"
        :question="'Already have an account?'"
        :route-path="'/'"
        :action-name="'Login here'"
      />
    </template>
  </AuthContainer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { PhAt, PhPassword, PhUser } from '@phosphor-icons/vue'
import BaseTitle from '@/components/base/BaseTitle.vue'
import AuthContainer from '../components/AuthContainer.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import AuthRouteChange from '../components/AuthRouteChange.vue'
import BaseMessage from '@/components/base/BaseMessage.vue'

const authStore = useAuthStore()

const username = ref('')
const email = ref('')
const password = ref('')
const regiterLoading = computed(() => authStore.regiterLoading)
const authMessage = computed(() => authStore.authMessage)

const clearAuthMessage = () => {
  authStore.clearAuthMessage()
}

const submitRegister = async () => {
  await authStore.registerNewUser(email.value, password.value, username.value)
}
</script>
