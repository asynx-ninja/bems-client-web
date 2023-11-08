import { useLocation, Link } from "react-router-dom";
import NavbarBrgy from "../global/NavbarBrgy";
const TouristSpotMain = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const locations = queryParams.get("location");
  const details = queryParams.get("details");
  const image = queryParams.get("image");
  const image1 = queryParams.get("image1");
  const image2 = queryParams.get("image2");
  const image3 = queryParams.get("image3");
  return (
    <>
      <NavbarBrgy />
      <div className="p-6 bg-white mb-12 rounded-lg shadow-md max-w-4xl m-auto mt-12 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
        <Link to="/">
          <button className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Back
          </button>
        </Link>
        <h1 className="text-3xl font-bold mb-2 text-green-700">{name}</h1>
        <h2 className="text-xl text-gray-600 mb-4">{locations}</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <img
            className="w-full h-32 object-cover rounded-lg"
            src={image}
            alt={name}
          />
          <img
            className="w-full h-32 object-cover rounded-lg"
            src={image1}
            alt={name}
          />
          <img
            className="w-full h-32 object-cover rounded-lg"
            src={image2}
            alt={name}
          />
          <img
            className="w-full h-32 object-cover rounded-lg"
            src={image3}
            alt={name}
          />
        </div>
        {details.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-700">
            {paragraph}
          </p>
        ))}
      </div>
    </>
  );
};

export default TouristSpotMain;
