import { useLoaderData, useNavigate } from "react-router-dom";
import SingleImg from "./SingleImg/SingleImg";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
const Home = () => {
  const allPlaces = useLoaderData();
  const [selectedPlace, setSelectedPlace] = useState(allPlaces[0]);
  const navigate = useNavigate();
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 15,
    },
  });
  const handleSelectedPlace = id => {
    const allSliders = document.querySelectorAll(".keen-slider__slide");
    for (const allSlider of allSliders) {
      if (allSlider.classList.contains("active-place")) {
        allSlider.classList.remove("active-place");
      }
    }
    document.querySelector(`.number-slide${id}`).classList.add("active-place");
    const foundedPlace = allPlaces.find(place => place.id === id);
    setSelectedPlace(foundedPlace);
  };
  useEffect(() => {
    document.querySelector(`.number-slide1`).classList.add("active-place");
  }, []);
  return (
    <div className="cs-container mt-20 lg:mt-40">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-center">
        <div className="lg:col-span-2 space-y-5">
          <h2 className="font-Bebas text-5xl lg:text-7xl text-white">
            {selectedPlace.name}
          </h2>
          <p className="text-white font-Montserrat">
            {selectedPlace.description}
          </p>
          <button
            className="btn cs-primary-btn font-Montserrat text-black"
            onClick={() => navigate(`/place/${selectedPlace.id}`)}
          >
            Booking{" "}
            <span className="ml-3">
              <FaArrowRight />
            </span>
          </button>
        </div>
        <div className="lg:col-span-3 z-10">
          <div ref={sliderRef} className="keen-slider">
            {allPlaces.map(place => (
              <SingleImg
                key={place.id}
                data={place}
                handleSelectedPlace={handleSelectedPlace}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
