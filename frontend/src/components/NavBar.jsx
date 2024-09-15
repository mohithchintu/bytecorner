import React from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../context/userContext";

const NavBar = () => {
  const location = useLocation();
  const { pathname } = location;
  const { isAuthenticated, logout } = useUser();

  const links = [
    { href: "/courses", label: "Courses" },
    { href: "/about", label: "About" },
  ];

  return (
    <div className="flex justify-between items-center border-b px-5 h-[80px] bg-white shadow-md">
      <div className="flex items-center space-x-6">
        <Link to="/">
          <img src="./Logo.jpg" className="h-10 w-32" alt="Logo" />
        </Link>
        <div className="flex space-x-6">
          {links.map((link) => (
            <Link
              key={link.href}
              className={classNames({
                "text-teal-500": link.href === pathname,
                "text-stone-500": link.href !== pathname,
                "hover:text-stone-400 transition-colors": true,
              })}
              to={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex space-x-6">
        {isAuthenticated ? (
          <>
            <Link
              to="/profile"
              className={classNames({
                "text-teal-600": pathname === "/profile",
                "text-stone-500": pathname !== "/profile",
                "hover:text-stone-400": true,
              })}
            >
              Profile
            </Link>
            <button
              onClick={logout}
              className="text-teal-600 hover:text-stone-400 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className={classNames({
                "text-teal-600": pathname === "/register",
                "text-stone-500": pathname !== "/register",
                "hover:text-stone-400": true,
              })}
            >
              Register
            </Link>
            <Link
              to="/login"
              className={classNames({
                "text-teal-600": pathname === "/login",
                "text-stone-500": pathname !== "/login",
                "hover:text-stone-400": true,
              })}
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
