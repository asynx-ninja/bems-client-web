import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import axios from "axios";
import API_LINK from "../../config/API";
import { useParams, useSearchParams } from "react-router-dom";
const NewsCarousel = () => {
  const [banners, setBanners] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams()
  const brgy = searchParams.get("brgy")

  useEffect(() => {
    const fetchBanners = async () => {
      // Replace with your actual API call
      const response = await axios.get(`${API_LINK}/services/banner/${brgy}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setBanners(response.data);
      // console.log(response.data)
    };

    fetchBanners();
  }, []);

  return (
    <div className="w-full flex justify-center py-5">
      <Carousel
        interval={10000}
        showIndicators={false}
        showStatus={false}
        autoPlay
        infiniteLoop
        showArrows={true}
        showThumbs={false}
      >
        {banners.map((item, i) => (
          <div key={i} className="my-auto">
            <div className="relative">
              <img
                src={item.banner}
                alt="Service banner"
                className="w-full h-[300px] object-cover md:h-96 md:object-cover md:w-full"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default NewsCarousel;
