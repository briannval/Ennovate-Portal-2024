"use client";

const TeamMemberSkeleton = () => {
  return (
    <div className="relative h-[250px] w-[250px] cursor-pointer transition-all duration-300 ease-in-out overflow-hidden m-[25px] rounded-[25px] shadow-lg bg-gray-200 animate-pulse">
      <div className="absolute w-full h-full object-cover rounded-[25px] bg-gray-300"></div>
      <div className="absolute bottom-0 left-0 px-6 py-4 text-white z-50">
        <div className="w-3/4 h-6 bg-gray-400 rounded-md mb-2"></div>
        <div className="w-1/2 h-4 bg-gray-400 rounded-md"></div>
      </div>
    </div>
  );
};

export default TeamMemberSkeleton;
