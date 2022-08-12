import { initializeApp } from "firebase/app";
import  Constants from "expo-constants";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.firebaseApiKey,
  authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
  projectId: Constants.manifest?.extra?.firebaseProjectId,
  storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
  appId: Constants.manifest?.extra?.firebaseAppId,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

export default app;