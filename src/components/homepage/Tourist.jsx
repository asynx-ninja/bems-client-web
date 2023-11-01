import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Tourist = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  const touristSpots = [
    {
      name: "Mt. Susong Dalaga",
      location: "Montalban Rizal",
      image: "https://montalbanrizalph.com/wp-content/uploads/2022/08/Picture90-2.jpg",
    },
    {
      name: "Mt. Mal-ac",
      location: "Montalban Rizal",
      image: "https://montalbanrizalph.com/wp-content/uploads/2022/08/Picture98-2-1.jpg",
    },
    {
      name: "Mt. Matamis na Luya",
      location: "Montalban Rizal",
      image: "https://montalbanrizalph.com/wp-content/uploads/2022/08/Picture75-2-1.jpg",
    },
    {
      name: "Mt. Lubog",
      location: "Montalban Rizal",
      image: "https://montalbanrizalph.com/wp-content/uploads/2022/08/Picture80-2-1.jpg",
    },
  ];
  return (
    <div
      id="tourist"
      className="bg-white flex min-h-[400px] justify-center"
    >
      <div
        data-aos="zoom-in"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-mirror="true"
        data-aos-once="false"
        className=" sm:block md:mt-32 md:mb-32 md:px-14 mt-6 px-4 mb-12  gap-4 w-full md:w-full mx-auto container justify-center items-center"
      >
        <h1 className="text-center text-2xl md:text-4xl text-gray-900 font-bold mt-4 mb-4 sm:mt-12 md:mt-4">
          Famous Tourist Spot
        </h1>
        <Carousel
          responsive={responsive}
          autoPlay
          infinite
          autoPlaySpeed={3000}
          showArrows={false}
          showStatus={true}
          customLeftArrow={<></>}
          customRightArrow={<></>}
          className="sm:mt-12 -mt-12 md:mt-8 lg:mt-0 "
        >
          {touristSpots.map((spot, index) => (
            <div className="carousel-item-container p-4 " key={index}>
              <div className="rounded-xl relative">
                {/* Overlay */}
                <div className="absolute w-full h-full bg-black/50 rounded-xl text-white">
                  <p className="font-bold text-md sm:text-sm md:text-2xl px-4 pt-4">
                    {spot.name}
                  </p>
                  <p className="px-4 text-xs sm:text-xs md:text-sm">
                    {spot.location}
                  </p>
                  <button
                    type="button"
                    className="p-1 inline-flex mx-2 absolute bottom-2 md:bottom-4 justify-center items-center gap-2 rounded-md border text-xs md:text-sm font-medium bg-white text-black shadow-sm align-middle 0"
                  >
                    Read more
                  </button>
                </div>
                <img
                  className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl"
                  src={spot.image}
                  alt={spot.name}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Tourist;
