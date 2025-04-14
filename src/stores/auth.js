import { defineStore } from 'pinia'
import { auth, db } from '@/plugins/firebase'

export const useAuthStore = defineStore('AutStore', {
  state: () => ({
    errorMessage: null,
    regiterLoading: false,
    loginLoading: false,
  }),
  actions: {
    registerNewUser(email, password, username) {
      this.regiterLoading = true
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          this.regiterLoading = false
          const user = userCredential.user
          console.log('user', user)
        })
        .catch((error) => {
          this.regiterLoading = false
          const errorCode = error.code
          this.errorMessage = error.message
        })
    },
    loginUser(email, password) {
      this.loginLoading = true
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user
          console.log('user', user)
          this.loginLoading = false
        })
        .catch((error) => {
          this.loginLoading = false
          const errorCode = error.code
          this.errorMessage = error.message
        })
    },
  },
})
