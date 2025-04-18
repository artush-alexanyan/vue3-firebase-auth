<template>
  <BasePageContainer :title="'Account details'">
    <template #page-content>
      <div class="w-full">
        <div v-if="userLoading">
          <BaseLoader />
        </div>
        <div
          v-else
          class="w-xl bg-white dark:bg-gray border border-gray-200 dark:border-gray rounded-2xl p-5 mt-10"
        >
          <div v-if="user">
            <div class="flex items-center space-x-5">
              <BaseImage
                :image-url="user.avatar"
                :alt="user.displayName"
                :image-class="'h-48 w-48 rounded-full border border-primary'"
                :load-class="'h-48 w-48 min-w-48 rounded-full text-5xl'"
              />
              <UserDetails :user="user" />
            </div>
          </div>
          <div class="w-full flex items-center justify-center" v-else>
            <div class="flex flex-col items-center w-xs">
              <h3 class="text-xl mb-3">Not user signed in</h3>
              <BaseButton :label="'Login'" @button-action="navigateLogin" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </BasePageContainer>
</template>
<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BasePageContainer from '../components/base/BasePageContainer.vue'
import BaseLoader from '@/components/base/BaseLoader.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseImage from '@/components/base/BaseImage.vue'
import UserDetails from './components/UserDetails.vue'

const authStore = useAuthStore()
const router = useRouter()
const user = computed(() => authStore.user)
const userLoading = computed(() => authStore.userLoading)

const navigateLogin = () => {
  router.push({ name: 'AuthLogin' })
}

onMounted(() => {
  authStore.checkUserState()
})
</script>
