import {useState,useEffect} from 'react';
import { getAuth, onAuthStateChanged} from 'firebase/auth';
import { firebase } from '../config/firebase';

const auth = getAuth();

export function useAuthentication() {
  const [user, setUser] = useState('');

  // const getUserInfo = async (user) =>{

  //   let uid = user.uid
  //   // Discard fetch when user ID not defined
  //   if (!uid) return;
  //   const userRef = firebase.firestore
  //   .collection('users')
  //   .doc(uid)
  //   .get();

  //   const doc = await userRef.get();
  //   const userData = doc.data();
  //   setUser(userData);
    
  // }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
    
      setUser(user)
    })
    return unsubscribe;
  }, [])
  return user;
} 