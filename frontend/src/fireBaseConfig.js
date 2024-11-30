// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: "expense-tracker-1aab3",
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyBgm2MaYEuG6h7ZpayTyrEH16nYeOyieAQ",
  authDomain: "expense-tracker-1aab3.firebaseapp.com",
  databaseURL: "https://expense-tracker-1aab3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "expense-tracker-1aab3",
  storageBucket: "expense-tracker-1aab3.firebasestorage.app",
  messagingSenderId: "513489042052",
  appId: "1:513489042052:web:434a364c7b7bd70b75e0d1",
  measurementId: "G-HJDMV9XDMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;