import { React, useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Breadcrumbs from "../components/articles/Breadcrumbs";
import Form from "../components/articles/Form";
import defaultBanner from "../assets/image/1.png";
import defaultLogo from "../assets/header/side-bg.png";
import API_LINK from "../config/API";
import axios from "axios";
import video from "../assets/image/video.mp4";

const Articles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const brgy = searchParams.get("brgy");
  const event_id = searchParams.get("event_id");
  const page = searchParams.get("page");
  const [announcement, setAnnouncement] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `${API_LINK}/announcement/all/?brgy=${brgy}&page=${page}`
        );

        const filtered = res.data.result.find(
          (announcement) => announcement.event_id === event_id
        );

        setAnnouncement(filtered);

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
  }, [brgy, page]);

  // console.log(announcement)

  return (
    <div className="w-full flex flex-col">
      {/* <div>
        <div className="relative h-[250px] w-full object-cover">
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
      </div> */}
      {/* CONTENTS */}
      <div className="flex flex-col">
        <div>
          <Form announcement={announcement} />
        </div>
      </div>
    </div>
  );
};

export default Articles;
