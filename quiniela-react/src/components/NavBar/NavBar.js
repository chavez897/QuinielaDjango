import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { MenuIcon } from "../ui/Icons/MenuIcon";

export const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logout());
  };
  const [show, setShow] = useState(window.innerWidth >= 1024);
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width >= 1024) {
        setShow(true);
      } else {
        setShow(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-900 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link className="font-semibold text-xl tracking-tight" to="/home">
          NFL Pool
        </Link>
      </div>
      <div className="flex lg:hidden">
        <p className="block mt-0 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
          {user.username}
        </p>
        <button
          className="flex items-center px-3 py-2 border rounded text-white hover:text-white hover:border-white"
          onClick={() => {
            setShow(!show);
          }}
        >
          <MenuIcon />
        </button>
      </div>
      {show && (
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
              to="/home"
            >
              Home
            </Link>
            <Link
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
              to="/leagues"
            >
              Leagues
            </Link>
          </div>
          <div>
            <p className="hidden lg:block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
              {user.username}
            </p>
            <p
              className="cursor-pointer block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
              onClick={handleLogout}
            >
              Logout
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};
