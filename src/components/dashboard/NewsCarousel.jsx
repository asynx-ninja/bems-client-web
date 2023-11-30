import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import axios from "axios";
import API_LINK from "../../config/API";
import { useLocation, useSearchParams, Link } from "react-router-dom";

const NewsCarousel = () => {
  const location = useLocation();
  const [services, setServices] = useState([]);
  const [announcement, setAnnouncements] = useState([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `${API_LINK}/services/?brgy=${brgy}&archived=false&approved=Approved`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setServices(response.data);
      } catch (err) {
        console.log(err.message);
      }

      try {
        const res = await axios.get(
          `${API_LINK}/announcement/all/?brgy=${brgy}`
        );
        setAnnouncements(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchNews();
  }, [brgy]);

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
        {services &&
          services.map((item, i) => (
            <div
              key={i}
              className="w-full relative"
              to={{
                pathname: `/services_form`,
                search: `id=${id}&brgy=${brgy}&service_id=${item.service_id}`,
              }}
            >
              <div className="relative">
                <img
                  src={item.collections.banner.link}
                  alt="Service banner"
                  className="w-full h-[300px] object-cover md:h-96 md:object-contain md:w-full"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black opacity-0 transition-opacity duration-300 hover:opacity-50">
                  <p className="text-white font-bold text-center">
                    {item.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        {announcement &&
          announcement.map((item, i) => (
            <Link
              key={i}
              className="w-full relative"
              to={{
                pathname: `/events/`,
                search: `id=${id}&brgy=${brgy}&event_id=${item._id}`,
              }}
            >
              <div className="relative">
                <img
                  src={item.collections.banner.link}
                  alt="Service banner"
                  className="w-full h-[300px] object-cover md:h-96 md:object-contain md:w-full"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black opacity-0 transition-opacity duration-300 hover:opacity-50">
                  <p className="text-white font-bold text-center">
                    Click to view {item.title}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </Carousel>
    </div>
  );
};

export default NewsCarousel;
