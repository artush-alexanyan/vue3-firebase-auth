import { defineStore } from 'pinia'

export const useUtilStore = defineStore('UtilStore', {
  actions: {
    generateRandomAvatarUrl() {
      const id = Math.random().toString(36).substring(2, 12)
      const url = `https://robohash.org/${encodeURIComponent(id)}.png`
      return url
    },

    generateFirebaseId() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let autoId = ''
      for (let i = 0; i < 20; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return autoId
    },
    formatFirebaseMessage(firebaseMessage, messageType) {
      console.log('firebaseMessage', firebaseMessage)

      // If firebaseMessage is falsy (null, undefined, empty), return a generic message
      if (!firebaseMessage) {
        return {
          message:
            messageType === 'Error'
              ? 'Something went wrong. Please try again later.'
              : 'Action successfull!',
          type: messageType,
        }
      }

      let formattedMessage = firebaseMessage

      // Remove the Firebase prefix if present (e.g., "Firebase: Error message (auth/code)")
      const firebaseTextIndex = formattedMessage.indexOf('Firebase:')
      if (firebaseTextIndex !== -1) {
        formattedMessage = formattedMessage.slice(firebaseTextIndex + 'Firebase:'.length).trim()
      }

      // Remove the error code in parentheses if present (e.g., "(auth/code)")
      const errorCodeStartIndex = formattedMessage.indexOf('(')
      if (errorCodeStartIndex !== -1) {
        formattedMessage = formattedMessage.slice(0, errorCodeStartIndex).trim()
      }

      return {
        message: formattedMessage,
        type: messageType,
      }
    },
  },
})
