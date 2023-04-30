import { createContext, useState } from "react";

export const AuthContext = createContext("");
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [storeAllPlace, setStoreAllPlace] = useState([]);
  const data = {
    user,
    setStoreAllPlace,
    storeAllPlace,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
