/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "../../utils/firebase/firebase.config";
export const AuthContext = createContext("");
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [storeAllPlace, setStoreAllPlace] = useState([]);
  const [bookingRoute, setBookingRoute] = useState("/");
  const googleAuth = new GoogleAuthProvider();
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
  //google log on
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleAuth);
  };
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
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
