import { createBrowserRouter, Outlet } from "react-router-dom";
import Error404 from "../config/Error404";

// COMPONENTS
import Navbar from "../components/global/Navbar";

// LOGIN PAGES
import Homepage from "../pages/home/HomePage";
import Barangay from "../pages/home/Barangay";

import Login from "../pages/login/LoginPage";
import Signup from "../pages/login/SignupPage";

import Changepass from "../pages/forgotpass/Changepass";
import Codeverify from "../pages/forgotpass/Codeverify";
import Emailverify from "../pages/forgotpass/Emailverify";
import Loading from "../pages/forgotpass/Loading";

// PAGES
import Dashboard from "../pages/Dashboard";
import Events from "../pages/Events";
import Settings from "../pages/Settings";
import BarangayInfo from "../pages/BarangayInfo";
import Requests from "../pages/Requests";
import Inquiries from "../pages/Inquiries/Inquiries";
import Services from "../pages/Services";
import ServicesForm from "../pages/ServicesForm";

// DASHBOARD SUB PAGES
import Mobile from "../components/dashboard/Mobile";


//Tourist Spot
import TouristSpotMain from "../components/touristspot/TouristSpotMain";
import TouristSpot from "../pages/home/TouristSpot"

// EVENTS
import EventsInfo from "../components/dashboard/EventsInfo";
import EventsApplication from "../pages/EventsApplication";

// BLOTTER
import Blotter from "../pages/Blotter";

const pages = [
  {
    path: "/dashboard",
    element: (
      <>
        <Navbar />
        <Dashboard />
      </>
    ),
  },
  {
    path: "/mobile",
    element: (
      <>
        <Navbar />
        <Mobile />
      </>
    )
  },
  {
    path: "/blotter",
    element: (
      <>
        <Navbar />
        <Blotter />
      </>
    )
  },
  {
    path: "/events-application",
    element: (
      <>
        <Navbar />
        <EventsApplication />
      </>
    )
  },
  {
    path: "/events-list",
    element: (
      <>
        <Navbar />
        <EventsInfo />
      </>
    )
  },
  {
    path: "/events",
    element: (
      <>
        <Navbar />
        <Events />
      </>
    ),
  },
  {
    path: "/requests",
    element: (
      <>
        <Navbar />
        <Requests />
      </>
    ),
  },
  {
    path: "/settings",
    element: (
      <>
        <Navbar />
        <Settings />
      </>
    ),
  },
  {
    path: "/barangay-info",
    element: (
      <>
        <Navbar />
        <BarangayInfo />
      </>
    ),
  },
  {
    path: "/inquiries",
    element: (
      <>
        <Navbar />
        <Inquiries />
      </>
    ),
  },
  {
    path: "/services",
    element: (
      <>
        <Navbar />
        <Services />
      </>
    ),
  },
  {
    path: "/services_form",
    element: (
      <>
        <Navbar />
        <ServicesForm />
      </>
    ),
  },
  {
    path: "/tourist-spot-list",
    element: <TouristSpot />,
  },
  {
    path: "/tourist-spot",
    element: <TouristSpotMain />,
  },
  {
    path: "/change_pass/:email",
    element: <Changepass />,
  },
  {
    path: "/email_verify",
    element: <Emailverify />,
  },
  {
    path: "/code_verify/:email",
    element: <Codeverify />,
  },
  {
    path: "/loading",
    element: <Loading />,
  },
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/barangay",
    element: <Barangay />,
  },
];

const Route = createBrowserRouter([
  {
    element: <Outlet />,
    errorElement: <Error404 />,
    children: pages,
  },
]);

export default Route;
