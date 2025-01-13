// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhwcMZE5I53Rm6d6dYmpn04_r4lAB1tSY",
  authDomain: "fir-practice-8e253.firebaseapp.com",
  projectId: "fir-practice-8e253",
  storageBucket: "fir-practice-8e253.firebasestorage.app",
  messagingSenderId: "773679644577",
  appId: "1:773679644577:web:e6c41fdd38c87cc590d5e0",
  measurementId: "G-C2F2VYBZSJ"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();


// you add:  import { getAuth } from "firebase/auth";
//  and then:  export const auth = getAuth(); so we can import it 