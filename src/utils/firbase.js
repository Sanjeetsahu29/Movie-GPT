// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwFiGoBijuXQVUbjhBGsfHuaog4M_ISRs",
  authDomain: "netflix-gpt-fe2c1.firebaseapp.com",
  projectId: "netflix-gpt-fe2c1",
  storageBucket: "netflix-gpt-fe2c1.firebasestorage.app",
  messagingSenderId: "362477510193",
  appId: "1:362477510193:web:8b0f3e8a69a391cd75bf10",
  measurementId: "G-LD86V6Q6Q8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);