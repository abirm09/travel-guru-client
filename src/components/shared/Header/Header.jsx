import logWhite from "../../../logo-white.png";
import logDark from "../../../logo-dark.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider/AuthProvider";
import { FaSearch, FaBars } from "react-icons/fa";
const Header = ({ isWhite }) => {
  const { user } = useContext(AuthContext);
  const [storeAllPlace, setStoreAllPlace] = useState([]);
  const [searchRes, setSearchRes] = useState([]);
  const [mobileMenuShow, setMobileMenuShow] = useState(false);
  const [showSearchSuggestion, setShowSearchSuggestion] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/places/all")
      .then(res => res.json())
      .then(data => {
        setStoreAllPlace(data);
      });
  }, []);
  const handleSearch = event => {
    const searchResultArr = [];
    for (const singlePlace of storeAllPlace) {
      const searchStr = event.target.value.toLowerCase();
      const placeName = singlePlace.name.toLowerCase();
      if (placeName.includes(searchStr)) {
        searchResultArr.push(singlePlace);
      }
    }
    console.log(searchResultArr);
    setSearchRes(searchResultArr);
  };
  const handleFocusOut = () => {
    setTimeout(() => {
      setShowSearchSuggestion(false);
    }, 200);
  };
  return (
    <header className="py-5 lg:py-9">
      <div className="cs-container">
        <nav className="grid grid-cols-2 lg:grid-cols-12 ">
          <figure className="col-span-1 lg:col-span-2">
            <img src={isWhite ? logWhite : logDark} alt="Banner" />
          </figure>
          <button
            className={`${
              isWhite ? "text-white" : "tex-black"
            } text-2xl block lg:hidden ml-auto`}
            onClick={() => setMobileMenuShow(!mobileMenuShow)}
          >
            <FaBars />
          </button>
          <div
            className={`absolute lg:static col-span-1 lg:col-span-10 lg:flex justify-between flex-wrap items-center space-y-5 lg:space-y-0 mt-5 lg:mt-0 transition-all h-screen lg:h-auto bg-slate-800 lg:bg-transparent -ml-2 lg:ml-0 pl-10 lg:pl-0 pt-10 lg:pt-0 z-30 pr-5 -top-5`}
            style={{ left: `${mobileMenuShow ? 0 : "-100%"}` }}
          >
            <div className="max-w-[370px] w-full bg-opacity-25 bg-white border-white border text-white rounded-md flex ">
              <span className="p-4">
                <FaSearch />
              </span>
              <div className="relative w-full">
                <input
                  type="text"
                  className="form-control w-full p-3 bg-transparent border-none"
                  placeholder="Search your destination..."
                  onKeyUp={handleSearch}
                  onFocus={() => setShowSearchSuggestion(true)}
                  onBlur={handleFocusOut}
                />
                <div
                  className={`max-h-40 h-max absolute bg-white w-full text-black overflow-y-scroll ${
                    showSearchSuggestion ? "block" : "hidden"
                  }`}
                >
                  <ul>
                    {searchRes.map(res => (
                      <li
                        key={res.id}
                        onClick={() => navigate(`place/${res.id}`)}
                        className="px-5 border py-2"
                      >
                        {res.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <ul
                className={`${
                  isWhite ? "text-white" : "text-black"
                } font-Montserrat font-medium lg:flex  gap-5 items-center space-y-4 lg:space-y-0`}
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
