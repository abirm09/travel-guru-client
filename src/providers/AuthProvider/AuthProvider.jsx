/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import app from "../../utils/firebase/firebase.config";
export const AuthContext = createContext("");
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [storeAllPlace, setStoreAllPlace] = useState([]);
  const [bookingRoute, setBookingRoute] = useState("/");
  const googleAuth = new GoogleAuthProvider();
  const facebookAuth = new FacebookAuthProvider();
  //get all places
  useEffect(() => {
    fetch("https://travel-guru-server-rose.vercel.app/places/all")
      .then(res => res.json())
      .then(data => {
        setStoreAllPlace(data);
      });
  }, []);
  //create user with email and pass
  const createUserWithEmail = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  //google log in
  const signInWithGoogle = () => signInWithPopup(auth, googleAuth);
  //facebook log in
  const signInWIthFacebook = () => signInWithPopup(auth, facebookAuth);
  //log out
  const logOutUser = () => signOut(auth);
  //observe user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => {
      return unsubscribe();
    };
  }, []);
  const data = {
    user,
    setStoreAllPlace,
    storeAllPlace,
    setBookingRoute,
    bookingRoute,
    createUserWithEmail,
    logOutUser,
    signInWithGoogle,
    signInWIthFacebook,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
