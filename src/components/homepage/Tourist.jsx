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
        const result = await axios.get(`${API_LINK}/tourist_spot/?brgy=${"All"}&archived=false`)

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
  const touristSpots = [
    {
      name: "Mt. Susong Dalaga",
      location: "Montalban Rizal",
      image:
        lubog1,
      image1:
        lubog2,
      image2:
        lubog3,
      image3:
        lubog4,
      details:
        "Mount Susong Dalaga is a scenic viewpoint in Rizal situated nearby to Mount Lagyo. This mountain is usually part of the Trilogy hike – Mt. Parawagan + Mt. Lagyo + Mt. Susong Dalaga. The initial trails were relatively easy until reaching the grassland which eventually leads to the very steep ascent to its peak.\n This steep incline would actually make it harder for climbers to reach the summit during the rainy season. Mt. Susong Dalaga has a 70° assault downslope composed of loose soil with ridges on both sides. \n Mt. Lagyo and Mt. Binacayan can also be seen at the summit of Mt. Susong Dalaga. Mt. Susong Dalaga summit is just a small open space with no trees and can only accommodate a small group of hikers at a time.",
    },
    {
      name: "Mt. Mal-ac",
      location: "Montalban Rizal",
      image:
        malac1,
      image1:
        malac2,
      image2:
        malac3,
      image3:
        malac4,
      details:
        "Mt Malac is a perfect trail for those looking for a less-traveled mountain to hike, with the reward of a refreshing side trip to waterfalls after. The trail is a combination of grasslands ridges and minor rocky river trekking. Although the trail takes 2-3 hours to the summit, 1.5 hours to the waterfalls, and 2 hours back to the jump off, totaling 5.5 to 6.5 hours of walking on sometimes uncovered path, the terrain is pretty easy and can be dared even by persistent beginners. Mount Malac is situated southeast of Mount Cabuan, and north of Mount Caypipili. \n The first part of the trail traverses the dry riverbed before starting the assault. The second part of the trail is the first assault with vegetation providing shade to hikers. Some parts of the trail can be characterized by burned grassland due to kaingin.Some vegetation still served as shade from the scorching heat of the sun at the beginning of the ascent. However, close to the summit, the grassland has dominated the panorama with a few trees here and there. \n The usual twin hike combination includes Mt. Macareba + Mt. Mal-ac with a side trip to Puray Falls or Baawan Waterfalls. Hiking Mt. Mal-ac highlights a breathtaking 360 view of Sierra Madre Mountain with an option to do overnight camp at Mogul Peak.",
    },
    {
      name: "Mt. Matamis na Luya",
      location: "Montalban Rizal",
      image:
        luya1,
      image1:
        luya2,
      image2:
        luya3,
      image3:
        luya4,
      details:
        "Also called Mt. Purro. This mountain offers a wide variety of flora and fauna. The adventure involves 11.5-hour trek, 8 river crossings, and rafting. The trail is mostly exposed with some loose soil and cogon grass. Narra and bamboo trees are also common along the trail. The descending trail sometimes has loose soil and rocks with streams along the way. Common wildlife are cows, goats, chicken, swift and crows but there are no limatiks. \n You can have a view of Marikina, Anipolo, Tanay, Rodriguez, Rizal and General Nakar Mountain Ranges. It is recommended to wear sun protection – sleeves and gloves can be helpful. There is no campsite here. Always pass thru the required registration and secure guides. You may need special permission as this mountain is protected.",
    },
    {
      name: "Mt. Lubog",
      location: "Montalban Rizal",
      image:
        sdalaga1,
      image1:
        sdalaga2,
      image2:
        sdalaga3,
      image3:
        sdalaga4,
      details:
        "Mt. Lubog is a very promising day hike in Rizal. It takes about 1 hour and 45 minutes of hiking to reach the summit depending on your pace. It’s so much like Mt. Lagyo and other mountains in Montalban because of the limestone. The one thing that sets Mt. Lubog apart from the other hiking destinations in Rodriguez, is the thick forest canopy that provides cover to climbers until one reaches the clearing at the rocky summit.\nAt 955 MASL, the summit is a wonderful haven of rocks, where hikers can feel perched in one of the gateways to the breathtaking view of the southern Sierra Madre. The summit resembles a labyrinth of boulders and karst formations. This is one of the reasons why the summit of Mt. Lubog is also referred to as “Simbahang Bato”.",
    },
  ];
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
