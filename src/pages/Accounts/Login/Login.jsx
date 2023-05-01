import { Link } from "react-router-dom";
import googleLogo from "../../../assets/socials-icons/google.png";
import facebook from "../../../assets/socials-icons/facebook.png";
const Login = () => {
  return (
    <div className="cs-container">
      <div className="max-w-[570px] mx-auto">
        <div className="w-full px-4 lg:px-14 py-2 lg:py-9 border rounded-md">
          <h4 className="font-Montserrat text-2xl font-bold">Login</h4>
          <form className="mt-10 space-y-5">
            <div>
              <input
                type="text"
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
                <span className="btn-link text-amber-500 hover:text-amber-600 select-none cursor-pointer">
                  Forgot password
                </span>
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
            <button className="btn bg-transparent border-1 border-gray-300 items-center text-black normal-case gap-2 rounded-full pl-1 hover:bg-gray-300 hover:border-gray-300 w-4/5 justify-between">
              <img
                src={facebook}
                alt="Log in with google"
                className="w-[37px]"
              />
              <span className="mx-auto font-Montserrat">
                Continue with Facebook
              </span>
            </button>
            <button className="btn bg-transparent border-1 border-gray-300 items-center text-black normal-case gap-2 rounded-full pl-1 hover:bg-gray-300 hover:border-gray-300 w-4/5 justify-between">
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
  );
};

export default Login;
