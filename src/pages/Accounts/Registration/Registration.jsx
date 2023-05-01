import { Link } from "react-router-dom";
import googleLogo from "../../../assets/socials-icons/google.png";
import facebook from "../../../assets/socials-icons/facebook.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider/AuthProvider";
import { updateProfile } from "firebase/auth";

const Registration = () => {
  const { createUserWithEmail } = useContext(AuthContext);
  const [passStrength, setPassStrength] = useState("");
  const [passStrengthOnInput, setPassStrengthOnInput] = useState("");
  const [show, setShow] = useState(false);
  const handleRegistration = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.firstName.value + " " + form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;
    const cPass = form.cPass.value;
    setPassStrength("");
    if (password.length < 6) {
      setPassStrength("Password should greater than 8 character.");
      return;
    }
    if (password !== cPass) {
      setPassStrength("Password and confirm password not matched.");
      return;
    }
    createUserWithEmail(email, password)
      .then(result => {
        console.log(result);
        sendData(result.user, name);
      })
      .catch(err => console.log(err));
  };
  //send user data
  const sendData = (user, name) => {
    updateProfile(user, {
      displayName: name,
    })
      .then(() => {
        console.log("Updated successfully.");
      })
      .catch(err => console.log(err));
  };
  const handlePassInput = event => {
    const password = event.target.value;
    setPassStrengthOnInput("");
    if (password.length < 6) {
      setPassStrengthOnInput("Week");
    }
    if (
      password.length >= 6 &&
      /(?=.*[A-Z])/.test(password) &&
      /(?=.*[0-9].*[0-9])/.test(password)
    ) {
      setPassStrengthOnInput("Moderate");
    } else {
      setPassStrengthOnInput("Week");
    }
    if (
      password.length > 10 &&
      /(?=.*[A-Z])/.test(password) &&
      /(?=.*[0-9].*[0-9])/.test(password) &&
      /(?=.*[!@#$&*])/.test(password)
    ) {
      setPassStrengthOnInput("Strong");
    }
  };
  return (
    <div className="cs-container">
      <div className="max-w-[570px] mx-auto">
        <div className="w-full px-4 lg:px-14 py-2 lg:py-9 border rounded-md">
          <h4 className="font-Montserrat text-2xl font-bold">
            Create an account
          </h4>
          <form className="mt-10 space-y-5" onSubmit={handleRegistration}>
            <div>
              <input
                type="text"
                placeholder="First name"
                className="outline-0 border-b p-2 w-full"
                name="firstName"
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Last name"
                className="outline-0 border-b p-2 w-full"
                name="lastName"
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Username or Email"
                className="outline-0 border-b p-2 w-full"
                name="email"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="outline-0 border-b p-2 w-full"
                name="password"
                onInput={handlePassInput}
                onFocus={() => setShow(true)}
                onBlur={() => setShow(false)}
                required
              />
              <p
                className={`${show ? "block" : "hidden"} ${
                  passStrengthOnInput === "Week" && "text-red-700"
                } ${passStrengthOnInput === "Moderate" && "text-amber-700"} ${
                  passStrengthOnInput === "Strong" && "text-green-800"
                } font-bold`}
              >
                {passStrengthOnInput}
              </p>
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="outline-0 border-b p-2 w-full"
                name="cPass"
                required
              />
            </div>
            <p className="font-bold font-Montserrat text-red-600">
              {passStrength}
            </p>
            <div>
              <input
                type="submit"
                value="Register"
                className="btn cs-primary-btn w-full"
              />
            </div>
          </form>
          <h2 className="text-center py-3 font-bold">
            Already have an account?{" "}
            <Link className="text-amber-500 btn-link" to="/accounts/login">
              Login
            </Link>{" "}
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

export default Registration;
