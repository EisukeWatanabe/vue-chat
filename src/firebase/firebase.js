import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDPZsn6FUuBb19es2GDQGg07omub2V7cx0",
    authDomain: "vue-chat-f36db.firebaseapp.com",
    projectId: "vue-chat-f36db",
    storageBucket: "vue-chat-f36db.appspot.com",
    messagingSenderId: "322177651102",
    appId: "1:322177651102:web:46894641e6833916d7868f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;