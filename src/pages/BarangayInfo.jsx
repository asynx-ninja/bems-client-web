import React from "react";
import video from "../assets/image/video.mp4";
import Details from "../components/barangayinfo/Details";

const BarangayInfo = () => {
  return (
    <>
      <div>
        <div className="relative lg:h-[400px] w-full object-cover">
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
      <Details />
    </>
  );
};

export default BarangayInfo;
