"use client";

import Image from "next/image";
import { useState } from "react";

const TeamMember = ({
  name,
  title,
  email,
  img,
}: {
  name: string;
  title: string;
  email: string;
  img: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMouseEnter = () => {
    if (isLoaded) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (isLoaded) {
      setIsHovered(false);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative h-[250px] w-[250px] cursor-pointer transition-all duration-300 ease-in-out overflow-hidden m-[25px] rounded-[25px] shadow-lg"
    >
      {/* Loaded State */}
      <Image
        className="absolute w-full h-full object-cover object-top rounded-[25px] transition-transform duration-300 ease-in-out transform hover:scale-105"
        src={img}
        alt={`${name}'s picture`}
        fill={true}
        onLoad={() => setIsLoaded(true)}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-blue-600 via-transparent to-transparent transition-opacity duration-300 ease-in-out"
        style={{ opacity: isHovered ? 1 : 0.7 }}
      />
      <div className="absolute bottom-0 left-0 px-6 py-4 text-white z-10">
        <h1 className="font-semibold text-[20px]">{name}</h1>
        <p className="font-light text-[14px]">{isHovered ? email : title}</p>
      </div>
      <button></button>
      {/* Loading State */}
      <div className={isLoaded ? "hidden" : "block"}>
        <div className="absolute w-full h-full object-cover rounded-[25px] bg-gray-300"></div>
        <div className="absolute bottom-0 left-0 px-6 py-4 text-white z-50">
          <div className="w-3/4 h-6 bg-gray-400 rounded-md mb-2"></div>
          <div className="w-1/2 h-4 bg-gray-400 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
