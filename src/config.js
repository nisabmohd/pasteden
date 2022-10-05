import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6dKY5Vfm3_K7XvDmX_4g1FfXgiF8kTx0",
  authDomain: "pastebin-3f471.firebaseapp.com",
  projectId: "pastebin-3f471",
  storageBucket: "pastebin-3f471.appspot.com",
  messagingSenderId: "1044292460952",
  appId: "1:1044292460952:web:e85c0e754aaa8a2fd1cbed"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);