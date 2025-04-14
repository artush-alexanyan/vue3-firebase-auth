import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDnwbY3yYeaKy469E3e5T8AsKNIfjKhGEI',
  authDomain: 'vue-firebase-app-167a7.firebaseapp.com',
  databaseURL: 'https://vue-firebase-app-167a7.firebaseio.com',
  projectId: 'vue-firebase-app-167a7',
  storageBucket: 'vue-firebase-app-167a7.firebasestorage.app',
  messagingSenderId: '454700761506',
  appId: '1:454700761506:web:8dbc4e62cee1439a6932fb',
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { storage, db, auth }
