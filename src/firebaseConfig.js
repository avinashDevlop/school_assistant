import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth'; // Import getAuth function

const firebaseConfig = {
  apiKey: "AIzaSyDSAdHedJqAwo0sHDE-M5Q3jm6_OIapzSo",
  authDomain: "studentassistant-18fdd.firebaseapp.com",
  projectId: "studentassistant-18fdd",
  storageBucket: "studentassistant-18fdd.appspot.com",
  messagingSenderId: "969817872121",
  appId: "1:969817872121:web:a8a56ab5c188783ae6f428",
  measurementId: "G-9W2VC26NPV"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app); // Create Firebase Auth instance

export { database , app, storage, auth }; // Export database, app, storage, and auth
