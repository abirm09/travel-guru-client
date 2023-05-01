/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import app from "../../utils/firebase/firebase.config";
export const AuthContext = createContext("");
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [storeAllPlace, setStoreAllPlace] = useState([]);
  const [bookingRoute, setBookingRoute] = useState("/");
  //get all places
  useEffect(() => {
    fetch("http://localhost:5000/places/all")
      .then(res => res.json())
      .then(data => {
        setStoreAllPlace(data);
      });
  }, []);
  //create user with email and pass
  const createUserWithEmail = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
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
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
