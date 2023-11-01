import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import myImage from "../../assets/image/rizalleader.png";
const About = () => {
  return (
    <div
      id="about"
      className=" text-gray-900 sm:pt-[10px] md:pt-40 pt-20 container mx-auto gap-14 sm:pb-[90px]"
    >
      <section className="pt-6 mb-24">
        <div className="container mx-auto px-6">
          <div
            className="flex flex-wrap md:flex-nowrap items-center"
            data-aos="fade-in"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
          >
            <div className="w-full md:w-full lg:w-1/2 sm:p-0 md:p-6 ">
              <h3 className="sm:text-[24px] sm:leading-6 md:leading-none md: md:text-4xl font-medium text-black sm:text-center md:text-left">
                Welcome to Bagong Montalban
              </h3>
              <p className="mt-4 sm:text-[14px] md:text-[18px] text-black sm:text-center md:text-left">
                Mayor Ronnie S. Evangelista is committed to solving problems
                for the people across the town under his leadership. Expanding
                access to affordable healthcare, improving local capacity,
                uplifting the lives of working families as the Municipalities
                25th mayor. Mayor Ronnie Evangelista
              </p>
            </div>
            <div className="w-0 md:w-0 lg:w-1/2 p-6 hidden sm:hidden md:hidden lg:block">
              <div className="h-64 bg-white shadow-2xl rounded-md">
                <img
                  className="h-64 justify-center text-center mx-auto"
                  src="https://montalbanrizalph.com/wp-content/uploads/2023/06/sdffsdfsdf-1-1024x599.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-4 md:mt-6">
        <div className="container mx-auto px-6">
          <div
            className="flex flex-wrap md:flex-nowrap items-center mt-6"
            data-aos="fade-in"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
          >
            <div className="w-0 md:w-0 lg:w-1/2 sm:p-0 md:p-6 order-2 md:order-1 hidden sm:hidden md:hidden lg:block">
              <div className="h-64 bg-white shadow-2xl rounded-md">
                <img
                  src="https://scontent.fmnl8-3.fna.fbcdn.net/v/t39.30808-6/322573634_817929735973204_4080801538176815370_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFGUQKCrzP6gtJppprAAnv47ko_AhM3K2PuSj8CEzcrY6y3tgbPN2fiD3C_OBGnJKStFQVVTqGXvar4-tOPBgRu&_nc_ohc=QNyBoGGrUcYAX_PKS7h&_nc_ht=scontent.fmnl8-3.fna&oh=00_AfBR7NvhiWeDw-gz9cWc46fltZEAoFVdAJgRPvVMixkD-g&oe=65364092"
                  className="h-64 justify-center text-center mx-auto"
                  alt=""
                />
              </div>
            </div>
            <div className="w-full md:w-full lg:w-1/2 sm:p-0 md:p-6 order-1 md:order-2">
              <h3 className="sm:text-[24px] md:text-4xl sm:leading-6 md:leading-none sm:text-center md:text-left font-medium text-black">
                Meet the Ideological leader of Bagong Montalban
              </h3>
              <p className="mt-4 sm:text-[14px] md:text-[18px] text-black sm:text-center md:text-left">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Nobis quasi saepe hic placeat? Deleniti quibusdam praesentium
                rem, blanditiis, pariatur ipsum perferendis doloremque ab
                quidem distinctio maiores eos atque quam nemo!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="sm:mt-[90px] md:mt-6">
        <div className="container mx-auto px-6">
          <div
            data-aos="fade-in"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
            className=" md:p-8 md:flex mt-6"
          >
            {/* Left Column - Large Image (Hidden on Small Screens) */}
            <div className="md:w-1/2 hidden md:block">
              <div>
                <img
                  className="w-[350px] h-[400px] mx-auto rounded-lg  object-contain "
                  src="https://montalbanrizalph.com/wp-content/uploads/2023/07/asd.png"
                  alt="Your alt text"
                />
              </div>
            </div>

            <div className="md:w-1/2 md:pl-8">
              <div className="flex items-center justify-center h-full">
                <div>
                  <h1 className="sm:text-[24px] md:text-4xl sm:leading-6 md:leading-none font-bold text-gray-900 mb-4 sm:text-center md:text-left">
                    E-Services <b className="text-custom-green-header">Montalban</b>
                  </h1>
                  <p className="text-black sm:text-[14px] md:text-[18px] sm:text-center md:text-left md:px-0 sm:p-0 md:p-8 ">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
