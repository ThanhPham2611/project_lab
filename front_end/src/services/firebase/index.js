import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "project-lab-b80c2.firebaseapp.com",
  projectId: "project-lab-b80c2",
  storageBucket: "project-lab-b80c2.appspot.com",
  messagingSenderId: "543414539781",
  appId: "1:543414539781:web:704d0fb87bec8ee1e02e6c",
  measurementId: "G-BTHVRHWW14",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
