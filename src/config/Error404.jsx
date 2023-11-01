import React from 'react'
import { Link } from 'react-router-dom';
const Error404 = () => {

  
  return (
  
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
    <div className="text-center">
      <h1 className="text-6xl font-extrabold text-red-500 mb-4">ERROR 404</h1>
      <h1 className="text-3xl font-extrabold text-red-500 mb-8">Page Not Found</h1>
      <Link
        to="/"
        className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full transition duration-300"
      >
        Go back to the homepage
      </Link>
    </div>
  </div>
  )
}

export default Error404