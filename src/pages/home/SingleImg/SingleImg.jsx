const SingleImg = ({ data, handleSelectedPlace }) => {
  return (
    <div
      className={`keen-slider__slide number-slide${data.id} relative rounded-xl w-[270px]`}
      onClick={() => handleSelectedPlace(data.id)}
    >
      <figure>
        <img src={data.image} alt={data.name} />
      </figure>
      <div className="absolute top-0 left-0 w-full max-w-[270px] h-full bg-gradient-to-t from-black via-[rgba(0,0,0,0.0)]  to-[rgba(0,0,0,0.0)]">
        <h2 className="absolute bottom-4 left-3 text-white font-Bebas text-base md:text-4xl">
          {data.name}
        </h2>
      </div>
    </div>
  );
};

export default SingleImg;
