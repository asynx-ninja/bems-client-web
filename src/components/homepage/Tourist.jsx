import Carousel from "react-multi-carousel";
import { React, useEffect, useState } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import API_LINK from "../../config/API";
import "react-multi-carousel/lib/styles.css";
import lubog1 from "../../assets/tourist-spot/lubog1.jpg"
import lubog2 from "../../assets/tourist-spot/lubog2.jpg"
import lubog3 from "../../assets/tourist-spot/lubog3.jpg"
import lubog4 from "../../assets/tourist-spot/lubog4.jpg"
import luya1 from "../../assets/tourist-spot/luya1.jpg"
import luya2 from "../../assets/tourist-spot/luya2.jpg"
import luya3 from "../../assets/tourist-spot/luya3.jpg"
import luya4 from "../../assets/tourist-spot/luya4.jpg"
import malac1 from "../../assets/tourist-spot/malac1.jpg"
import malac2 from "../../assets/tourist-spot/malac2.jpg"
import malac3 from "../../assets/tourist-spot/malac3.jpg"
import malac4 from "../../assets/tourist-spot/malac4.jpg"
import sdalaga1 from "../../assets/tourist-spot/susong-dalaga1.jpg"
import sdalaga2 from "../../assets/tourist-spot/susong-dalaga2.jpg"
import sdalaga3 from "../../assets/tourist-spot/susong-dalaga3.jpg"
import sdalaga4 from "../../assets/tourist-spot/susong-dalaga4.jpg"

const Tourist = () => {

  const [touristSpot, setTouristSpot] = useState([]);

  useEffect(() => {
    const fetchTouristSpot = async () => {
      try {
        const result = await axios.get(`${API_LINK}/tourist_spot/?archived=false`)

        setTouristSpot(result.data)
      } catch (error) {
        console.log(error)
      }

    }
    fetchTouristSpot();
  })

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

  return (
    <div id="tourist" className="bg-white flex min-h-[400px] justify-center">
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
          {touristSpot.map((spot, index) => (
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
                  <Link
                    to={`/tourist-spot/?tourist_id=${spot._id}`}
                  >
                    <button
                      type="button"
                      className="p-1 inline-flex mx-2 absolute bottom-2 md:bottom-4 justify-center items-center gap-2 rounded-md border text-xs md:text-sm font-medium bg-white text-black shadow-sm align-middle 0"
                    >
                      Read more
                    </button>
                  </Link>
                </div>
                <img
                  className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl"
                  src={spot.image[0].link}
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
