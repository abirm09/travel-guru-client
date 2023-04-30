import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider/AuthProvider";
import Header from "../components/shared/Header/Header";
import { Outlet } from "react-router-dom";
import "./Main.css";
const Main = () => {
  const { user } = useContext(AuthContext);
  return (
    <section className="max-w-full min-h-screen main-banner h-full">
      <Header isWhite={true} />
      <Outlet />
    </section>
  );
};

export default Main;
