import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const HomePage = () => {
  return (
    <div>
      <div className="h-[80px] fixed top-0 w-full z-50">
        <NavBar />
      </div>

      <div className="min-h-80 mt-[80px] p-4">
        <div className="flex items-center justify-between bg-white p-4">
          {/* Left side: Image */}
          <div className="flex-shrink-0">
            <img className="w-96 h-auto" src="./Logo.jpg" alt="Logo" />
          </div>

          {/* Right side: Button */}
          <div className="flex-shrink-0">
            <button className="bg-teal-500 text-white text-sm px-6 py-3 rounded hover:bg-teal-600">
              Book Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
