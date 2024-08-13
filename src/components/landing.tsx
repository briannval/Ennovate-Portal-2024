"use client";

import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";

const Landing = () => {
  return (
    <div
      style={{ height: "calc(100vh - 5rem)", width: "100vw" }}
      className="relative"
    >
      {/* Background Image */}
      <div className="h-full">
        <Image
          src="/landing-banner.png"
          alt="Landing Banner Image"
          fill={true}
          className="object-cover"
        />
      </div>

      {/* Blue Overlay */}
      <div className="absolute inset-0 bg-blue-900 opacity-50"></div>

      {/* Text Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full">
        <div className="relative flex flex-col md:flex-row items-center">
          {/* ENNOVATE Text */}
          <div className="text-white text-center font-semibold text-6xl md:text-9xl">
            ENNOVATE
          </div>
          {/* Logo Image */}
          <div className="relative h-36 w-36 md:h-52 md:w-52 ml-4">
            <Image
              src="/ennovate-w.png"
              alt="Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>

        {/* Typewriter Effect */}
        <div className="text-white text-center text-xl md:text-3xl md:text-4xl">
          <Typewriter
            words={[
              "Develop business and soft skills",
              "Intensive entrepreneurial program",
              "Pitch to industry professionals",
            ]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={80}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </div>
        <div className="relative flex flex-col md:flex-row items-center mt-12">
          <button
            onClick={() =>
              document
                .querySelector("#about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-white hover:text-ennovate-dark-blue text-md md:text-xl font-extrabold bg-ennovate-main hover:bg-white rounded-xl px-4 py-2 text-center"
          >
            Get Started
          </button>
          <button
            onClick={() =>
              document
                .querySelector("#stats")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="md:ml-8 text-ennovate-dark-blue mt-4 md:mt-0 text-md md:text-xl font-extrabold bg-ennovate-yellow hover:bg-white rounded-xl px-4 py-2 text-center"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
