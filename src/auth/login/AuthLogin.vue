<template>
  <AuthContainer>
    <template #auth-content>
      <BaseMessage :message="authMessage" @delete-message="clearAuthMessage" />
      <BaseTitle :title="'Login'" />
      <form @submit.prevent="submitLogin" class="mt-5 flex flex-col space-y-3.5">
        <BaseInput
          v-model="email"
          :disabled="loginLoading"
          :id="'loginEmailInput'"
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
          :disabled="loginLoading"
          :id="'loginPasswordInput'"
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
          :disabled="loginLoading"
          :label="'Login'"
          :loading="loginLoading"
        />
      </form>
      <AuthRouteChange
        class="mt-2.5"
        :question="'Dont have an account?'"
        :route-path="'/register'"
        :action-name="'Register here'"
      />
    </template>
  </AuthContainer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { PhAt, PhPassword } from '@phosphor-icons/vue'
import BaseTitle from '@/components/base/BaseTitle.vue'
import AuthContainer from '../components/AuthContainer.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import AuthRouteChange from '../components/AuthRouteChange.vue'
import BaseMessage from '@/components/base/BaseMessage.vue'

const authStore = useAuthStore()
const authMessage = computed(() => authStore.authMessage)
const loginLoading = computed(() => authStore.loginLoading)

const email = ref('')
const password = ref('')

const clearAuthMessage = () => {
  authStore.clearAuthMessage()
}

const submitLogin = () => {
  authStore.loginUser(email.value, password.value)
}
</script>
