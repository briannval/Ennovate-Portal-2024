"use client";

import { useEffect, useState } from "react";
import { navbarLinks } from "@/constants/navbar";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAuthAction = () => {
    if (!isLoading) {
      setIsMenuOpen(false);
      if (isAuthenticated) {
        logout();
      } else {
        router.push("/login");
      }
    }
  };

  return (
    <nav
      className={`fixed w-full h-20 z-50 top-0 start-0`}
      style={{
        backgroundColor:
          pathname === "/"
            ? `rgba(63, 107, 180, ${scrollPosition * 0.01})`
            : "#3f6bb4", // this is ennovate-main in tailwind.config.ts
      }}
    >
      <div className="max-w-screen-xl h-max flex flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link
          onClick={() => setIsMenuOpen(false)}
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/ennovate/ennovate-w.webp" className="h-16" alt="Logo" />
        </Link>
        <div className="flex lg:order-2 space-x-3 lg:space-x-0 rtl:space-x-reverse">
          <button
            onClick={handleAuthAction}
            className="text-ennovate-dark-blue text-xl font-extrabold bg-ennovate-yellow hover:bg-white rounded-3xl px-4 py-2 text-center"
          >
            {isAuthenticated ? "LOGOUT" : "ADMIN"}
          </button>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center bg-transparent p-2 w-10 h-10 justify-center text-sm rounded-lg lg:hidden"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
            data-cy="toggle-navbar-menu"
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
          className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 lg:p-0 mt-4 bg-ennovate-main font-medium border border-gray-100 rounded-lg lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-transparent">
            {isAuthenticated && (
              <li key={navbarLinks.length}>
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  href="/admin"
                  className="block py-2 px-2 font-bold text-xl text-white rounded hover:underline hover:underline-offset-4"
                >
                  DASHBOARD
                </Link>
              </li>
            )}
            {navbarLinks.map((navbarLink, index) => (
              <li key={index}>
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  href={navbarLink.href}
                  className="block py-2 px-2 font-bold text-xl text-white rounded hover:underline hover:underline-offset-4"
                >
                  {navbarLink.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
