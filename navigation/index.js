import { useAuthentication } from '../hook/useAuthentication';
import UserStack from './userStack';
import AuthStack from './authStack';
// import { firebase } from "../config/firebase";
// import { getAuth } from "firebase/auth";

export default function RootNavigation() {
  // const auth = getAuth();
  // const user = auth.currentUser;

  const  user  = useAuthentication();

  return user ? <UserStack /> : <AuthStack />;
}