import React, { useEffect, useState } from "react";

const Loading = () => {
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    const delay = 10000;

    const intervalId = setInterval(() => {
      if (secondsLeft > 0) {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      } else {
        clearInterval(intervalId); // Clear the interval when the timer reaches 0
        window.location.href = "/"; // Redirect to the "/" location
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [secondsLeft]);

  return (
    <>
      <div
  className="h-screen flex justify-center items-center"
  style={{
    background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.template.net/99413/nature-forest-background-3b296.jpg')",
    backgroundSize: "cover",
    backgroundBlendMode:"multiply"
  }}
>
  <div className="flex flex-col justify-center items-center mx-auto p-10">
    <h1 className="font-heavy text-lg lg:text-2xl text-white text-center lg:tracking-[.4em] tracking-wider mb-5">
      YOUR ACCOUNT REGISTRATION IS BEING <br></br> REVIEWED BY THE ADMIN
    </h1>
    <img
      className="lg:w-[200px] w-[130px] mb-5"
      src="https://montalbanrizalph.com/wp-content/uploads/2020/07/MONTALBAN-LOGO.png"
      alt=""
    />
    <p className="text-center lg:text-base text-sm text-white mb-5">
      Please be informed your account registration to (Name of the
      barangay) portal will be reviewed.<br/>We will notify you to
      your (email address) regarding to your account status
    </p>
    <div className="loader mb-5"></div>

    <p className="text-white lg:text-base text-sm">Redirecting to homepage in {secondsLeft} seconds...</p>
    {/* <button
      type="button"
      className="w-[500px] uppercase text-black bg-white hover:bg-green-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-bold rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-gray-700 dark:border-gray-700"
    >
      return to homepage
    </button> */}
  </div>
</div>
    </>
  );
};

export default Loading;
