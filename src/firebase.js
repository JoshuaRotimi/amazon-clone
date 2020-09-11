import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyASoO1TPBpDf8Rf04dfEddnYVeoL3Xp9rE",
    authDomain: "clone-6e7c0.firebaseapp.com",
    databaseURL: "https://clone-6e7c0.firebaseio.com",
    projectId: "clone-6e7c0",
    storageBucket: "clone-6e7c0.appspot.com",
    messagingSenderId: "883423519488",
    appId: "1:883423519488:web:5d8a4b26ade5ca0c6309e5",
    measurementId: "G-9PLE1M8L2X"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};