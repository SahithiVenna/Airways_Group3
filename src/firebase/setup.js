// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBp6YDca4mjNhZsecLBKjGsaQvQ3-VFLEE",
  authDomain: "airline-management-syste-5de09.firebaseapp.com",
  projectId: "airline-management-syste-5de09",
  storageBucket: "airline-management-syste-5de09.appspot.com",
  messagingSenderId: "834732585158",
  appId: "1:834732585158:web:94942a3321e348f63867c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);