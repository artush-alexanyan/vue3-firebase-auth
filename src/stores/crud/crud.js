import { defineStore } from 'pinia'
import { db } from '@/plugins/firebase'
import { doc, setDoc, getDoc, deleteDoc, collection, getDocs, updateDoc } from 'firebase/firestore'

export const useCrudStore = defineStore('CrudStore', {
  state: () => ({
    loading: false,
    data: [],
  }),
  actions: {
    async addNewDocument(docData, collectionName, documentId) {
      try {
        this.loading = true
        await setDoc(doc(db, collectionName, documentId), docData)
      } catch (err) {
        console.error('Error adding document:', err)
      } finally {
        this.loading = false
      }
    },

    async deleteDocument(collectionName, documentId) {
      try {
        this.loading = true
        await deleteDoc(doc(db, collectionName, documentId))
      } catch (err) {
        console.error('Error deleting document:', err)
      } finally {
        this.loading = false
      }
    },

    async getCollectionItems(collectionName) {
      try {
        this.loading = true
        const querySnapshot = await getDocs(collection(db, collectionName))
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

    async updateDocument(collectionName, documentId, updatedData) {
      try {
        this.loading = true
        await updateDoc(doc(db, collectionName, documentId), updatedData)
      } catch (err) {
        console.error('Error updating document:', err)
      } finally {
        this.loading = false
      }
    },
    async updateTaskStatus(collectionName, taskId, newStatus) {
      return this.updateDocument(collectionName, taskId, { status: newStatus })
    },
    async getDocumentById(collectionName, documentId) {
      try {
        let singleDoc = null
        this.loading = true
        const docRef = doc(db, collectionName, documentId)
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
