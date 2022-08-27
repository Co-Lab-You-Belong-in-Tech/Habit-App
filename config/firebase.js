import firebase from "firebase/compat/app";
import  Constants from "expo-constants";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.firebaseApiKey,
  authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
  projectId: Constants.manifest?.extra?.firebaseProjectId,
  storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
  appId: Constants.manifest?.extra?.firebaseAppId,
};
let app;

if (firebase.apps.length === 0) {
  console.log("FIREBASE.APPS LENGTH IS ZERO")
  app = firebase.initializeApp(firebaseConfig)
  console.log("FIREBASE APP INITIALIZED WITH CONFIG")
} else {
  console.log("FIREBASE.APPS LENGTH GREATER THAN 0")
  app = firebase.app();
  console.log("DEFAULT FIREBASE APP INITILIZED")
}

export { firebase };


export default app;