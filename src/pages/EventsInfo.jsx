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
  const from = searchParams.get("from");
  const page = searchParams.get("page");
  const [announcement, setAnnouncement] = useState([]);
  const [totalApplied, setTotalApplied] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `${API_LINK}/announcement/specific/?brgy=${from}&archived=${false}&event_id=${event_id}`
        );

        const getAllApplication = await axios.get(
          `${API_LINK}/application/?brgy=${from}&archived=${false}&status=${"all"}&title=${"all"}`
        );

        const listOfApplication = getAllApplication.data.result;

        setTotalApplied(listOfApplication.length);

        setAnnouncement(res.data.result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvents();
  }, [brgy, page]);

  // console.log(totalApplied);

  return (
    <div className="w-full flex flex-col">
      {/* CONTENTS */}
      <div className="flex flex-col">
        <div>
          <Form announcement={announcement} totalApplied={totalApplied} />
        </div>
      </div>
    </div>
  );
};

export default Articles;
