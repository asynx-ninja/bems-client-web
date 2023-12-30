import { React, useEffect, useState } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import API_LINK from "../../config/API";

//COMPONENTS
import NavbarHome from "../global/NavbarHome";
import video from "../../assets/image/video.mp4";
import Breadcrumbs from "../../components/touristspot/Breadcrumbs"


const TouristSpotMain = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const tourist_id = searchParams.get("tourist_id")
  const [img, setImg] = useState("");
  const [imgList, setImgList] = useState([]);
  const [touristInfo, setTouristInfo] = useState([]);

  useEffect(() => {
    const fetchTouristSpot = async () => {
      try {
        const result = await axios.get(`${API_LINK}/tourist_spot/tourist_info/${tourist_id}`)

        setTouristInfo(result.data[0])
        setImgList(result.data[0].image)
        setImg(result.data[0].image[0].link);

      } catch (error) {
        console.log(error)
      }

    }
    fetchTouristSpot();
  }, [tourist_id])

  // console.log(touristInfo)

  const handleOnMouseOver = (e) => {
    const data = imgList[e.target.id];
    data === undefined ? setImg(imgList[0].link) : setImg(data.link);
  };

  return (
    <>
      <NavbarHome />

      <div className="mb-[20px]">
        <div className="relative lg:h-[250px] w-full object-cover">
          <video className="h-full w-full object-cover" autoPlay muted loop>
            <source src={video} type="video/mp4" />
          </video>
          <div
            className="absolute inset-0 bg-black opacity-50"
            style={{
              content: "''",
            }}
          />
        </div>
      </div>

      <div className='flex flex-col mb-[50px] sm:px-[15px] md:px-[30px]'>

        <Breadcrumbs touristInfo={touristInfo} />

        <div className="grid sm:grid-cols-1 lg:grid-cols-2 sm:px-[20px] lg:px-[50px] py-[50px]">
          <div className="grid gap-4 w-full">
            <div>
              <img className="h-full max-w-full w-full rounded-lg" src={img} alt="" />
            </div>
            <div className="grid grid-cols-5 sm:gap-1 lg:gap-4">
              {imgList.map((item, i) => (
                <button
                  onMouseOver={handleOnMouseOver}
                  value={item.id}
                  id={item.id}
                  key={i}
                  className="h-full max-w-full"
                >
                  <img
                    id={i}
                    name={item.name}
                    className="h-auto max-w-full rounded-lg"
                    src={item.link}
                    alt=""
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className='font-bold md:w-[90%] mx-auto py-10 flex justify-between'>
              <div className="flex flex-col gap-3">
                <h1 className='text-[38px] leading-8'>Welcome to <b className="text-custom-green-header">{touristInfo.name}</b></h1>
                <p className="text-gray-500">LOCATION: {touristInfo.brgy}</p>
              </div>
            </div>
            <div className="w-full md:px-[20px] ">
              <textarea
                disabled
                value={touristInfo.details}
                className="w-full h-[600px] md:text-[18px] text-black border-0 bg-transparent resize-none">
              </textarea>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default TouristSpotMain;
