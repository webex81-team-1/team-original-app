// 必要な関数を import
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALcWHaItRKxAx1nZDE1G6F-uvNNKwpdU8",
  authDomain: "electricals-original-team-app.firebaseapp.com",
  projectId: "electricals-original-team-app",
  storageBucket: "electricals-original-team-app.firebasestorage.app",
  messagingSenderId: "53779975097",
  appId: "1:53779975097:web:000d8b3e9e0def88800468",
  measurementId: "G-ZNXWVM3XP0",
};

// Firebaseアプリオブジェクトを初期化
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// Firestoreを読み込み、db(databaseの略)として export
export const db = getFirestore(app);
export { auth, provider };
