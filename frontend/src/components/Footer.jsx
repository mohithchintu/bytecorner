import React from "react";

const Footer = () => {
  return (
    <footer className="bg-stone-100 p-4 text-center">
      <p>ByteCorner - Your trusted learning platform since 2024</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="#" className="text-stone-600">
          Help
        </a>
        <a href="#" className="text-stone-600">
          FAQ
        </a>
        <a href="#" className="text-stone-600">
          Customer
        </a>
      </div>
    </footer>
  );
};

export default Footer;
