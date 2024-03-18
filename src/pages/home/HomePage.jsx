import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import NavbarHome from "../../components/global/NavbarHome";
import Home from "../../components/homepage/Home";
import About from "../../components/homepage/About";
import Services from "../../components/homepage/Services";
import Footer from "../../components/homepage/Footer";
import MunicipalOfficials from "../../components/homepage/MunicipalOfficials";
import Tourist from "../../components/homepage/Tourist";
import AOS from "aos";
import "aos/dist/aos.css";
import video from "../../assets/image/video.mp4";

const Homepage = () => {
  AOS.init();

  // You can also pass an optional settings object
  // below listed default settings
  AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
    initClassName: "aos-init", // class applied after initialization
    animatedClassName: "aos-animate", // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: "ease", // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
  });

  return (
    <div id="home">
      <NavbarHome />
      <div>
        <div className="relative lg:h-[443px] w-full object-cover">
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
      <div className="flex justify-center sm:-mt-[20px] md:-mt-[60px] h-auto md:mx-4 lg:mx-5">
        <div className="w-full lg:my-0 lg:mx-5 relative rounded-t-[25px] h-full mx-auto bg-white lg:shadow-2xl shadow-none md:w-full flex flex-col">
          <Home />
          <About />
          <MunicipalOfficials />
          <Services />
          <Tourist />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
