import { defineStore } from 'pinia'
import { db } from '@/plugins/firebase'
import { doc, setDoc, getDoc, deleteDoc, collection, getDocs, updateDoc } from 'firebase/firestore'

export const useCrudStore = defineStore('CrudStore', {
  state: () => ({
    loading: false,
    data: [],
  }),
  actions: {
    async addNewDocument(docData, connectionName, documentId) {
      try {
        this.loading = true
        await setDoc(doc(db, connectionName, documentId), docData)
      } catch (err) {
        console.error('Error adding document:', err)
      } finally {
        this.loading = false
      }
    },

    async deleteDocument(connectionName, documentId) {
      try {
        this.loading = true
        await deleteDoc(doc(db, connectionName, documentId))
      } catch (err) {
        console.error('Error deleting document:', err)
      } finally {
        this.loading = false
      }
    },

    async getCollectionItems(connectionName) {
      try {
        this.loading = true
        const querySnapshot = await getDocs(collection(db, connectionName))
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        return data
      } catch (err) {
        console.error('Error fetching collection:', err)
      } finally {
        this.loading = false
      }
    },

    async updateDocument(connectionName, documentId, updatedData) {
      try {
        this.loading = true
        await updateDoc(doc(db, connectionName, documentId), updatedData)
      } catch (err) {
        console.error('Error updating document:', err)
      } finally {
        this.loading = false
      }
    },
    async getDocumentById(connectionName, documentId) {
      try {
        let singleDoc = null
        this.loading = true
        const docRef = doc(db, connectionName, documentId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          singleDoc = { id: docSnap.id, ...docSnap.data() }
        } else {
          singleDoc = null
          console.warn('Document not found')
        }
        return singleDoc
      } catch (err) {
        console.error('Error fetching document:', err)
        singleDoc = null
      } finally {
        this.loading = false
      }
    },
  },
})
