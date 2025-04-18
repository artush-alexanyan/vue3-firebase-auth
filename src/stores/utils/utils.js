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
  },
})
