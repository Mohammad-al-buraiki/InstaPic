// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAavhsEp3SAaZOlNNcz59nbPZ8fdu76DWA",
  authDomain: "lex-database-6d447.firebaseapp.com",
  projectId: "lex-database-6d447",
  storageBucket: "lex-database-6d447.appspot.com",
  messagingSenderId: "707287371614",
  appId: "1:707287371614:web:4827028095088737bb89cf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
