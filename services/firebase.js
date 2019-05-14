import firebase from 'firebase'
import 'firebase/storage';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDYCuPbbM5CGT62Ktgk2bBS-M1Po7DeA2A",
    authDomain: "nuxt-b28dc.firebaseapp.com",
    databaseURL: "https://nuxt-b28dc.firebaseio.com",
    projectId: "nuxt-b28dc",
    storageBucket: "nuxt-b28dc.appspot.com",
    messagingSenderId: "808280790258",
    appId: "1:808280790258:web:6a4efbab83953a67"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

const db = firebase.firestore()
const storage = firebase.storage().ref()

export default firebase
export {
    db,
    storage
}