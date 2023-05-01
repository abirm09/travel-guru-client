import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../logo-dark.png";
const PasswordReset = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  if (user) {
    return navigate("/");
  }
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="px-2">
        <img src={logo} alt="Travel guru" className="mx-auto block" />
        <h2 className="mt-5 font-bold text-center text-2xl md:text-4xl">
          Travel Guru
        </h2>
        <div className="max-w-[360px] w-full p-6 border mt-5 rounded-md">
          <h2 className="font-Montserrat text-green-700 font-bold">
            A password reset email has been sent to your email.
          </h2>
          <p className="mt-3">Please check your email.</p>
          <button className="btn cs-primary-btn mt-5 w-full">
            <Link to="/accounts/login">Back to log In</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
