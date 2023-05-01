import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header/Header";

const Accounts = () => {
  return (
    <div>
      <Header isWhite={false} />
      <Outlet />
    </div>
  );
};

export default Accounts;
