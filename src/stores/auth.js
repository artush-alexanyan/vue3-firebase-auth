import { defineStore } from 'pinia'
import router from '@/router'
import { auth, db } from '@/plugins/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useCrudStore } from './crud/crud'
import { useUtilStore } from './utils/utils'

export const useAuthStore = defineStore('AutStore', {
  state: () => ({
    authMessage: null,
    regiterLoading: false,
    loginLoading: false,
    saving: false,
    signingOut: false,
    user: null,
    userLoading: false,
  }),
  actions: {
    navigatedashboard() {
      router.push({ path: '/dashboard' })
    },
    handleMessage() {},
    async addNewDocument(docData, documentId) {
      try {
        this.saving = true
        await setDoc(doc(db, 'users', documentId), docData)
      } catch (err) {
        const utilStore = useUtilStore()
        this.authMessage = utilStore.formatFirebaseMessage(error.message, 'Error')
      } finally {
        this.saving = false
        this.navigatedashboard()
      }
    },

    async registerNewUser(email, password, username) {
      const utilStore = useUtilStore()
      try {
        this.regiterLoading = true
        const userCredential = await auth.createUserWithEmailAndPassword(email, password)
        const user = userCredential.user
        const avatar = utilStore.generateRandomAvatarUrl()
        const userData = {
          id: user.uid,
          displayName: username,
          email: user.email,
          avatar,
          uid: user.uid,
        }
        await this.addNewDocument(userData, user.uid)
      } catch (error) {
        const utilStore = useUtilStore()
        this.authMessage = utilStore.formatFirebaseMessage(error.message, 'Error')
      } finally {
        this.regiterLoading = false
      }
    },
    async loginUser(email, password) {
      try {
        this.loginLoading = true
        const userCredential = await auth.signInWithEmailAndPassword(email, password)
        const user = userCredential.user
        this.navigatedashboard()
        return user
      } catch (error) {
        const utilStore = useUtilStore()
        this.authMessage = utilStore.formatFirebaseMessage(error.message, 'Error')
      } finally {
        this.loginLoading = false
      }
    },
    async signOutUser() {
      try {
        this.signingOut = true
        await auth.signOut()
        setTimeout(() => {
          this.signingOut = false
          router.push({ name: 'AuthLogin' })
        }, 1500)
      } catch (error) {
        this.signingOut = false
        const utilStore = useUtilStore()
        this.authMessage = utilStore.formatFirebaseMessage(error.message, 'Error')
      } finally {
        this.signingOut = false
      }
    },
    async checkUserState() {
      this.userLoading = true
      const crudStore = useCrudStore()
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const userId = user.uid
          try {
            const userData = await crudStore.getDocumentById('users', userId)
            this.user = userData
          } catch (error) {
            const utilStore = useUtilStore()
            this.authMessage = utilStore.formatFirebaseMessage(error.message, 'Error')
          } finally {
            this.userLoading = false
          }
        } else {
          this.user = null
          this.userLoading = false
        }
      })
    },
    clearAuthMessage() {
      this.authMessage = null
    },
  },
})
