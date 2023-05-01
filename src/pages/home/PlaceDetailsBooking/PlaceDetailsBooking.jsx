import { useContext, useEffect, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider/AuthProvider";
import { RangeDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";
import Swal from "sweetalert2";
const PlaceDetailsBooking = () => {
  const time = new Date();
  const { storeAllPlace, user, setBookingRoute } = useContext(AuthContext);
  const data = useLoaderData();
  const [division, setDivision] = useState([]);
  const [date, setDate] = useState([
    time.getFullYear(),
    time.getMonth(),
    time.getDay(),
  ]);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://travel-guru-server-abirm09.vercel.app/division/all")
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort();
        setDivision(sorted);
      });
    fetch("https://travel-guru-server-abirm09.vercel.app/times/date")
      .then(res => res.json())
      .then(data => setDate(data));
  }, []);
  const handleBooking = name => {
    if (user) {
      Swal.fire("Booked Successfully", name, "success");
    } else {
      setBookingRoute(location);
      navigate("/accounts/login");
    }
  };
  return (
    <div className="cs-container">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="md:col-span-1">
          <h2 className="font-Bebas text-5xl lg:text-7xl text-white ">
            {data.name}
          </h2>
          <p className="text-white font-Montserrat">{data.description}</p>
        </div>
        <div className="md:col-span-1">
          <div className="max-w-[470px] bg-white p-6 space-y-3 rounded-md">
            <div>
              <label
                htmlFor="division"
                className="block mb-4 font-Montserrat font-medium"
              >
                Origin
              </label>
              <select
                name="origin"
                className="block w-full p-5 bg-slate-200 rounded-md font-Montserrat font-bold"
              >
                {division.map((dd, index) => (
                  <option key={index} value={dd}>
                    {dd}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="division"
                className="block mb-4 font-Montserrat font-medium"
              >
                Destination
              </label>
              <select
                name="origin"
                className="block w-full p-5 bg-slate-200 rounded-md font-Montserrat font-bold"
              >
                {storeAllPlace.map(dd => (
                  <option key={dd.id} value={dd.name}>
                    {dd.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <RangeDatePicker
                startDate={new Date(date[0], date[1], date[2])}
                endDate={new Date(2023, 4, 8)}
                minDate={new Date(date[0], date[1], date[2])}
                maxDate={new Date(2023, date[1] + 5, 5)}
              />
            </div>
            <div>
              <button
                onClick={() => handleBooking(data.name)}
                className="btn cs-primary-btn w-full text-black font-Montserrat font-medium"
              >
                Start Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailsBooking;
