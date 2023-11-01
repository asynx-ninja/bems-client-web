import React from "react";
import NewsCarousel from "../components/dashboard/NewsCarousel";
import { Link } from "react-router-dom";
// Import the icon or image for each service
import service1Icon from "../assets/image/1.png";
// ... import the rest of the icons

const Services = () => {
  // Define your services
  const services = [
    {
      title: "Certificate of Indigency",
      description: "This is service 1",
      icon: service1Icon,
    },
    {
      title: "Certificate of Residency",
      description: "This is service 2",
      icon: service1Icon,
    },
    {
      title: "Barangay Clearance",
      description: "This is service 3",
      icon: service1Icon,
    },
    {
      title: "Blotter Report",
      description: "This is service 4",
      icon: service1Icon,
    },
    // {
    //   title: "Social welfare assistance programs",
    //   description: "This is service 1",
    //   icon: service1Icon,
    // },
    {
      title: "Permits and licenses",
      description: "This is service 5",
      icon: service1Icon,
    },
    {
      title: "Medical Consultation",
      description: "This is service 6",
      icon: service1Icon,
    },
    // ... define the rest of the services
  ];
  
  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-full text-center">
        {/* CAROUSEL */}
        <NewsCarousel />
      </div>
      <h1 className="text-center font-bold text-2xl sm:text-lg tracking-widest text-[#326350] my-8">
        PLEASE CHOOSE FROM THE FOLLOWING SERVICES
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 p-4 w-full max-w-7xl">
        {services.map((service, index) => (
           
         <Link to={`/services_form?title=${encodeURIComponent(service.title)}`} key={index}>
            <div className="group relative rounded-lg shadow-lg overflow-hidden transform transition duration-500 ease-in-out hover:scale-105">
              <img
                className="w-full h-48 object-cover "
                src={service.icon}
                alt={service.title}
              />
              <div className="px-6 py-4 bg-white">
                <h3 className="text-sm lg:text-xl font-bold text-gray-700 group-hover:text-green-700 transition duration-500">
                  {service.title}
                </h3>
                <p className="text-gray-700 group-hover:text-green-600 text-xs lg:text-sm transition duration-500">
                  {service.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Services;
