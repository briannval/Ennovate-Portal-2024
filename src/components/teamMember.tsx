"use client";

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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative h-[250px] w-[250px] cursor-pointer transition-all duration-300 ease-in-out overflow-hidden m-[25px] rounded-[25px] shadow-lg"
    >
      <img
        className="absolute w-full h-full object-cover rounded-[25px] transition-transform duration-300 ease-in-out transform hover:scale-105"
        src={img}
        alt={`${name}'s picture`}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-blue-600 via-transparent to-transparent transition-opacity duration-300 ease-in-out"
        style={{ opacity: isHovered ? 1 : 0.7 }}
      />
      <div className="absolute bottom-0 left-0 p-4 text-white z-50">
        <h1 className="font-semibold text-[20px]">{name}</h1>
        <p className="font-light text-[14px]">{isHovered ? email : title}</p>
      </div>
    </div>
  );
};

export default TeamMember;
