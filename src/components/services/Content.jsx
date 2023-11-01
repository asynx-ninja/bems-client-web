import React from "react";
import { FaPlus } from "react-icons/fa";

const Content = ({ serviceTitle }) => {
  const requirements = [
    {
      req: "Lorem Ipsum is ",
    },
    {
      req: "Lorem Ipsum is ",
    },
    {
      req: "Lorem Ipsum is ",
    },
  ];

  return (
    <div className="flex flex-col gap-5 px-5 md:px-0">
    
  
    {/* DESCRIPTION */}
  <div className="bg-white rounded-lg shadow-lg p-6 lg:w-[90%] w-100 mx-auto mb-10">
  <h1 className="text-custom-green-header font-bold text-2xl lg:text-[36px] w-[90%] mx-auto mb-10 text-center ">
      {serviceTitle}
    </h1>
    <div className="flex flex-col lg:flex-row items-start gap-10 ">
   
   <p className="lg:w-[60%] text-gray-600 leading-relaxed">
     Lorem Ipsum is simply dummy text of the printing and typesetting
     industry. Lorem Ipsum has been the industry's standard dummy text ever
     since the 1500s, when an unknown printer took a galley of type and
     scrambled it to make a type specimen book. It has survived not only
     five centuries, but also the leap into electronic typesetting,
     remaining essentially unchanged. It was popularised in the 1960s with
     the release of Letraset sheets containing Lorem Ipsum passages, and
     more recently with desktop publishing software like Aldus PageMaker
     including versions of Lorem Ipsum.
   </p>

   <img
     className="w-full lg:w-[400px] h-[400px] object-cover rounded-lg"
     src="./../src/assets/article/election.jpg"
     alt=""
   />
 </div>
  </div>
  
  
    {/* REQUIREMENTS */}
  
    <div className="flex flex-col  bg-white rounded-lg shadow-lg p-6 lg:w-[90%] w-100 mx-auto gap-5">
      <h1 className="text-custom-green-header font-bold text-2xl lg:text-[36px] mb-10 text-center">
        Requirements
      </h1>
      <p className="text-gray-600 mb-10 leading-relaxed">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only
        five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with
        the release of Letraset sheets containing Lorem Ipsum passages, and
        more recently with desktop publishing software like Aldus PageMaker
        including versions of Lorem Ipsum.
      </p>
  
      <div className="flex flex-col w-full lg:w-[80%]">
        {requirements.map((item, i) => (
          <div key={i} className="my-auto">
            <p className="flex gap-5 pb-[5px] text-gray-600 leading-relaxed">
              <FaPlus className="my-auto" /> {item.req}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Content;
