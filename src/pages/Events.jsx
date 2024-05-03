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
          `${API_LINK}/announcement/search/?brgy=${brgy}`
        );

        const filtered = res.data.result.find(
          (announcement) => announcement.event_id === event_id
        );

        // console.log(filtered);

        if (!filtered) {
          const res = await axios.get(
            `${API_LINK}/announcement/search/?brgy=${"MUNISIPYO"}`
          );

          const filtered = res.data.result.find(
            (announcement) => announcement.event_id === event_id
          );
          setAnnouncement(filtered);
        } else {
          setAnnouncement(filtered);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvents();
  }, [brgy, page]);

  // console.log(announcement)

  return (
    <div className="w-full flex flex-col">
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
