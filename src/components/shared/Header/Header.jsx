import logWhite from "../../../logo-white.png";
import logDark from "../../../logo-dark.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider/AuthProvider";
import { FaSearch } from "react-icons/fa";
const Header = ({ isWhite }) => {
  const { user } = useContext(AuthContext);
  return (
    <header className="py-9">
      <div className="cs-container">
        <nav className="grid grid-cols-2 lg:grid-cols-12 ">
          <figure className="col-span-1 lg:col-span-2">
            <img src={isWhite ? logWhite : logDark} alt="Banner" />
          </figure>
          <div className="col-span-1 lg:col-span-10 flex justify-between flex-wrap items-center">
            <div className="max-w-[370px] w-full bg-opacity-25 bg-white border-white border text-white rounded-md flex ">
              <span className="p-4">
                <FaSearch />
              </span>
              <div className="relative w-full">
                <input
                  type="text"
                  className="form-control w-full p-3 bg-transparent border-none"
                  placeholder="Search your destination..."
                />
                <div className="hidden max-h-40 h-max absolute bg-white w-full text-black overflow-y-scroll">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia
                  pariatur corrupti, tempora omnis deleniti ab sit porro,
                  expedita tenetur ratione explicabo consectetur deserunt fugiat
                  in magni autem odit ipsum sequi? Lorem, ipsum dolor sit amet
                  consectetur adipisicing elit. Error tenetur, labore qui
                  corporis quibusdam, repellat necessitatibus unde a praesentium
                  quos asperiores iste reiciendis doloribus quaerat minus
                  architecto, nobis libero modi!
                </div>
              </div>
            </div>
            <div>
              <ul
                className={`${
                  isWhite ? "text-white" : "text-black"
                } font-Montserrat font-medium flex  gap-5 items-center`}
              >
                <li>
                  <Link to="/">News</Link>
                </li>
                <li>
                  <Link to="/">Destination</Link>
                </li>
                <li>
                  <Link to="/">Blog</Link>
                </li>
                <li>
                  <Link to="/">Contacts</Link>
                </li>
                {!user ? (
                  <>
                    <li>
                      <button className="btn cs-primary-btn text-black">
                        Login
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li
                      className={`${
                        isWhite ? "text-white" : "text-black"
                      } font-bold`}
                    >
                      {user?.displayName || "No name found"}
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
