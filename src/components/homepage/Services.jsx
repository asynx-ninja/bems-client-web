import React from "react";
import reliable from "../../assets/services/reliable.png";
import userFriendly from "../../assets/services/user-friendly.png";
import secure from "../../assets/services/secure.png";
import transparency from "../../assets/services/transparency.png";
import fastTransaction from "../../assets/services/fast-transaction.png";
import backup from "../../assets/services/backup.png";

const Services = () => {
  const services = [
    {
      title: "Reliable",
      description: "Description for Service 1 goes here.",
      imageUrl: reliable,
    },
    {
      title: "User-friendly",
      description: "Description for Service 2 goes here.",
      imageUrl: userFriendly,
    },
    {
      title: "Secure",
      description: "Description for Service 3 goes here.",
      imageUrl: secure,
    },
    {
      title: "Transparency",
      description: "Description for Service 3 goes here.",
      imageUrl: transparency,
    },
    {
      title: "Fast Transaction",
      description: "Description for Service 3 goes here.",
      imageUrl: fastTransaction,
    },
    {
      title: "Data backup",
      description: "Description for Service 3 goes here.",
      imageUrl: backup,
    },
  ];
  return (
    //

    <div
      id="services"
      data-aos="fade-in"
      data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-mirror="true"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
      className="sm:pt-[30px] md:pt-[60px] justify-center items-center mx-auto flex flex-col gap-4"
    >
      {/* Hero Section */}
      <section className="">
        <div className="container mx-auto text-center">
          <h1 className="sm:text-[24px] md:text-4xl font-bold mb-4">
            Our Services
          </h1>
          <p className="sm:text-[14px] md:text-[18px]">
            Explore our range of premium services
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="mt-4 mb-10">
        <div className="container md:mx-auto sm:px-5 md:px-6 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 w-full">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg md:w-full shadow-md overflow-hidden"
            >
              <img
                src={service.imageUrl}
                alt={service.title}
                className="lg:w-24 w-auto mx-auto h-24 md:h-32 lg:h-24 object-cover"
              />
              <div className="p-2 sm:p-3 md:p-4">
                <h2 className="text-sm sm:text-lg md:text-xl sm:leading-6 md:leading-none font-bold mb-2">
                  {service.title}
                </h2>
                <p className="text-gray-600 sm:text-[14px] md:text-[18px]">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
