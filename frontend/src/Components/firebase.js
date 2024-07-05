// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClDDp44yMMBGSwI1KX_49gEzUDYYAbtd0",
  authDomain: "music-app-f25d3.firebaseapp.com",
  projectId: "music-app-f25d3",
  storageBucket: "music-app-f25d3.appspot.com",
  messagingSenderId: "519962614656",
  appId: "1:519962614656:web:916184133a596ff3dfff65",
  measurementId: "G-MBCCB5K29P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;