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

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleAuthAction = () => {
    if (!isLoading) {
      setIsMenuOpen(false);
      if (isAuthenticated) logout();
      else router.push("/login");
    }
  };

  return (
    <nav
      className="fixed w-full h-20 z-50 top-0 start-0"
      style={{
        backgroundColor:
          pathname === "/"
            ? `rgba(63, 107, 180, ${scrollPosition * 0.01})`
            : "#3f6bb4",
      }}
    >
      <div className="max-w-screen-xl h-20 flex items-center justify-between mx-auto px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/ennovate/ennovate-w.webp" className="h-12" alt="Logo" />
        </Link>

        {/* Right side: Admin + Hamburger */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleAuthAction}
            className="text-ennovate-dark-blue text-sm md:text-base font-extrabold bg-ennovate-yellow hover:bg-white rounded-3xl px-4 py-2"
          >
            {isAuthenticated ? "LOGOUT" : "ADMIN"}
          </button>

          {/* Hamburger (always visible) */}
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center bg-transparent p-2 w-10 h-10 justify-center rounded-lg"
            aria-controls="navbar-menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown (appears under navbar) */}
      {isMenuOpen && (
        <div className="bg-ennovate-main px-4 py-4">
          <ul className="flex flex-col gap-4">
            {isAuthenticated && (
              <li>
                <Link
                  href="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white font-bold hover:underline"
                >
                  DASHBOARD
                </Link>
              </li>
            )}
            {navbarLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white font-bold hover:underline"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
