import { createBrowserRouter, Outlet } from "react-router-dom";
import Error404 from "../config/Error404";


// COMPONENTS
import Navbar from "../components/global/Navbar";

// LOGIN PAGES
import Homepage from "../pages/home/HomePage";
import Barangay from "../pages/home/Barangay";

import Login from "../pages/login/LoginPage";
import Signup from "../pages/login/SignupPage";
import Nextsignup from "../pages/login/NextSignup";
import Lastsignup from "../pages/login/LastPage";

import Changepass from "../pages/forgotpass/Changepass";
import Codeverify from "../pages/forgotpass/Codeverify";
import Emailverify from "../pages/forgotpass/Emailverify";
import Loading from "../pages/forgotpass/Loading";

// PAGES 
import Dashboard from "../pages/Dashboard"
import Articles from "../pages/Articles";
import Settings from "../pages/Settings";
import BarangayInfo from "../pages/BarangayInfo"
import Requests from "../pages/Requests";
import Inquiries from "../pages/Inquiries/Inquiries"
import Sent from "../pages/Inquiries/Sent"
import Message from "../components/inquiriesComponents/viewInquiry"
import SentMessage from "../components/inquiriesComponents/viewSent"
import Services from "../pages/Services";
import ServicesForm from "../pages/ServicesForm";

const pages = [
  {
    path: "/dashboard/:id/:brgy",
    element: (
      <>
        <Navbar />
        <Dashboard />
      </>
    ),
  },
  {
    path: "/article/:id/:brgy",
    element: (
      <>
        <Navbar />
        <Articles />
      </>
    ),
  },
  {
    path: "/requests/:id/:brgy",
    element: (
      <>
        <Navbar />
        <Requests />
      </>
    ),
  },
  {
    path: "/settings/:id/:brgy",
    element: (
      <>
        <Navbar />
        <Settings />
      </>
    ),
  },
  {
    path: "/barangay-info/:id/:brgy",
    element: (
      <>
        <Navbar />
        <BarangayInfo />
      </>
    )
  },
  {
    path: "/inquiries/:id/:brgy",
    element: (
      <>
        <Navbar />
        <Inquiries />
    </>
    )
  },
  {
    path: "/services/:id/:brgy",
    element: (
      <>
        <Navbar />
        <Services />
      </>
    ),
  },
  {
    path: "/message/:id/:brgy",
    element: (
      <>
        <Navbar />
        <Message />
      </>
    ),
  },
  {
    path: "/sentmessage/:id/:brgy",
    element: (
      <>
        <Navbar />
        <SentMessage />
      </>
    ),
  },
  {
    path: "/sent/:id/:brgy",
    element: (
      <>
        <Navbar />
        <Sent />
    </>
    )
  },
  {
    path: "/services_form/:id/:brgy",
    element: (
      <>
        <Navbar />
        <ServicesForm />
      </>
    ),
  },
  {
    path: "/change_pass",
    element: <Changepass />,
  },
  {
    path: "/email_verify",
    element: <Emailverify />,
  },
  {
    path: "/code_verify",
    element: <Codeverify />,
  },
  {
    path: "/loading/:email/:brgy",
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
    path: "/next_signup",
    element: <Nextsignup />,
  },
  {
    path: "/last_signup",
    element: <Lastsignup />,
  },
  {
    path: "/barangay",
    element: <Barangay />,
  },
]

const Route = createBrowserRouter([
  {
    element: <Outlet />,
    errorElement: <Error404 />,
    children: pages,
  },
]);

export default Route;