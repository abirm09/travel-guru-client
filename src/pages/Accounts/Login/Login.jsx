import { Link, Navigate, useNavigate } from "react-router-dom";
import googleLogo from "../../../assets/socials-icons/google.png";
import facebook from "../../../assets/socials-icons/facebook.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider/AuthProvider";
const Login = () => {
  const {
    signInWithEmailAndPass,
    user,
    resetPassword,
    signInWithGoogle,
    signInWIthFacebook,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const [resetErr, setResetErr] = useState("");
  const handleLogIn = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    signInWithEmailAndPass(email, password)
      .then(result => console.log(result.user))
      .catch(err => console.log(err));
  };
  const handlePasswordReset = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    resetPassword(email)
      .then(() => {
        navigate("/accounts/reset-password");
      })
      .catch(err => {
        setResetErr(err.message);
      });
  };
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(result => console.log(result.user))
      .catch(err => console.log(err));
  };
  const handleFaceBookLogIn = () => {
    signInWIthFacebook()
      .then(result => console.log(result.user))
      .catch(err => console.log(err));
  };
  if (user) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <>
      <div className="cs-container">
        <div className="max-w-[570px] mx-auto">
          <div className="w-full px-4 lg:px-14 py-2 lg:py-9 border rounded-md">
            <h4 className="font-Montserrat text-2xl font-bold">Login</h4>
            <form className="mt-10 space-y-5" onSubmit={handleLogIn}>
              <div>
                <input
                  type="email"
                  placeholder="Username or Email"
                  className="outline-0 border-b p-2 w-full"
                  name="email"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="outline-0 border-b p-2 w-full"
                  name="password"
                />
              </div>
              <div className="flex justify-between">
                <div>
                  <input type="checkbox" id="remember" />
                  <label
                    htmlFor="remember"
                    className="select-none cursor-pointer font-semibold ml-2"
                  >
                    Remember me
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="password-reset"
                    className="btn-link text-amber-500 hover:text-amber-600 select-none cursor-pointer"
                  >
                    Forgot password
                  </label>
                </div>
              </div>
              <div>
                <input
                  type="submit"
                  value="Login"
                  className="btn cs-primary-btn w-full"
                />
              </div>
            </form>
            <h2 className="text-center py-3 font-bold">
              Do not have an account?{" "}
              <Link
                className="text-amber-500 btn-link"
                to="/accounts/registration"
              >
                Register
              </Link>
            </h2>
          </div>
          <div>
            <hr className="w-4/5 mt-5 mx-auto border-t-2" />
            <span className="bg-white w-10 h-10 flex justify-center items-center absolute left-2/4 -translate-y-1/2 -translate-x-1/2">
              or
            </span>
            <div className="mt-10 space-y-5 flex flex-col items-center">
              <button
                className="btn bg-transparent border-1 border-gray-300 items-center text-black normal-case gap-2 rounded-full pl-1 hover:bg-gray-300 hover:border-gray-300 w-4/5 justify-between"
                onClick={handleFaceBookLogIn}
              >
                <img
                  src={facebook}
                  alt="Log in with google"
                  className="w-[37px]"
                />
                <span className="mx-auto font-Montserrat">
                  Continue with Facebook
                </span>
              </button>
              <button
                className="btn bg-transparent border-1 border-gray-300 items-center text-black normal-case gap-2 rounded-full pl-1 hover:bg-gray-300 hover:border-gray-300 w-4/5 justify-between"
                onClick={handleGoogleLogin}
              >
                <img
                  src={googleLogo}
                  alt="Log in with google"
                  className="w-[35px]"
                />
                <span className="mx-auto font-Montserrat">
                  Continue with Google
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="password-reset" className="modal-toggle" />
      <label htmlFor="password-reset" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Reset your password</h3>
          <form onSubmit={handlePasswordReset}>
            <input
              type="email"
              className="outline-0 border-b p-2 w-full"
              placeholder="Enter your email"
              name="email"
            />
            <p className="text-red-700 font-bold">
              {resetErr &&
                " Error:" + resetErr?.split("/")[1]?.replace(")", "")}
            </p>
            <div className="flex justify-end">
              <input
                type="submit"
                value="Reset"
                className="btn cs-primary-btn mt-5 font-Montserrat text-black"
              />
            </div>
          </form>
        </label>
      </label>
    </>
  );
};

export default Login;
