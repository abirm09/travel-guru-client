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
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
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
    fetch("https://travel-guru-server-abirm09.vercel.app/places/all")
      .then(res => res.json())
      .then(data => {
        setStoreAllPlace(data);
      });
  }, []);
  //create user with email and pass
  const createUserWithEmail = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  //sign in with pass
  const signInWithEmailAndPass = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  //google log in
  const signInWithGoogle = () => signInWithPopup(auth, googleAuth);
  //facebook log in
  const signInWIthFacebook = () => signInWithPopup(auth, facebookAuth);
  //log out
  const logOutUser = () => signOut(auth);
  //reset password
  const resetPassword = email => sendPasswordResetEmail(auth, email);
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
    signInWithEmailAndPass,
    resetPassword,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
