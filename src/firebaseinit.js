// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmIiZpiC9bafkwZVY4Xl9c30gDUKQ0b7U",
  authDomain: "photofolio-afa38.firebaseapp.com",
  projectId: "photofolio-afa38",
  storageBucket: "photofolio-afa38.firebasestorage.app",
  messagingSenderId: "425233325320",
  appId: "1:425233325320:web:68a46c8f33ea556d3f20bd",
  measurementId: "G-LR55QQSW96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
export {db};