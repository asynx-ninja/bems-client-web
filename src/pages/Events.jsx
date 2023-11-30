import { React, useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Breadcrumbs from "../components/articles/Breadcrumbs";
import Content from "../components/articles/Content";
import defaultBanner from "../assets/image/1.png";
import defaultLogo from "../assets/header/side-bg.png";
import API_LINK from "../config/API";
import axios from "axios";

const Articles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const event_id = searchParams.get("event_id");
  const [announcement, setAnnouncement] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `${API_LINK}/announcement/all/?brgy=${brgy}`
        );

        const filtered = res.data.find(
          (announcement) => announcement._id === event_id
        );

        setAnnouncement(filtered);

        var banner = document.getElementById("banner");
        banner.src =
          filtered.collections.banner.link !== ""
            ? filtered.collections.banner.link
            : defaultBanner;
        var logo = document.getElementById("logo");
        logo.src =
          filtered.collections.logo.link !== ""
            ? filtered.collections.logo.link
            : defaultLogo;
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvents();
  }, [brgy]);

  // console.log(announcement)

  return (
    <div className="w-full flex flex-col sm:px-[15px] lg:px-[70px] pt-[40px]">
      <img
        className=" rounded-[25px] h-[300px] object-contain"
        id="banner"
        alt=""
      />

      {/* CONTENTS */}
      <div className="flex flex-col">
        <div className="flex mt-[20px]">
          <Breadcrumbs title={announcement.title} />
        </div>
        <div>
          <Content announcement={announcement} />
        </div>
      </div>
    </div>
  );
};

export default Articles;
