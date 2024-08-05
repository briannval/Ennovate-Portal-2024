"use client";

import { useState } from "react";
import { navbarLinks } from "@/constants/navbar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-ennovate-main fixed w-full h-20 z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl h-max flex flex-wrap items-center justify-between mx-auto px-4 py-2">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/ennovate-w.png" className="h-16" alt="Logo" />
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button className="text-ennovate-dark-blue text-xl font-bold bg-ennovate-yellow hover:bg-white font-medium rounded-3xl text-sm px-4 py-2 text-center">
            ADMIN
          </button>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center bg-transparent p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-ennovate-main md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            {navbarLinks.map((navbarLink, index) => (
              <li key={index}>
                <a
                  href={navbarLink.href}
                  className="block py-2 px-2 font-bold text-xl text-white rounded hover:text-ennovate-gray"
                >
                  {navbarLink.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
