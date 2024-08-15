"use client";

import { deleteTeamMember } from "@/actions/db";
import { storage } from "@/lib/firebase";
import { getImageExtensionFromFirebaseLink, urlizeString } from "@/utils/utils";
import { ref, deleteObject } from "firebase/storage";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

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
  const [toDelete, setToDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { isAuthenticated } = useAuth();

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

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const urlizedName = urlizeString(name);
      const fileExtension = getImageExtensionFromFirebaseLink(img);
      const imagePath = `team-members/${urlizedName}.${fileExtension}`;
      const storageRef = ref(storage, imagePath);
      await Promise.all([
        deleteObject(storageRef),
        deleteTeamMember({
          name: name,
          email: email,
          title: title,
          image: img,
        }),
      ]);
      setIsDeleting(false);
      setToDelete(false);
      window.location.href = "/team"; // hard refresh
    } catch (e) {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative inline-block">
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
        {isAuthenticated && (
          <button
            onClick={() => setToDelete(true)}
            className="absolute rounded-2xl font-extrabold text-xl top-2 right-2 bg-ennovate-yellow text-white py-2 px-4 rounded"
          >
            -
          </button>
        )}
        {/* Loading State */}
        <div className={isLoaded ? "hidden" : "block"}>
          <div className="absolute w-full h-full object-cover rounded-[25px] bg-gray-300"></div>
          <div className="absolute bottom-0 left-0 px-6 py-4 text-white z-50">
            <div className="w-3/4 h-6 bg-gray-400 rounded-md mb-2"></div>
            <div className="w-1/2 h-4 bg-gray-400 rounded-md"></div>
          </div>
        </div>

        {/* Confirm delete modal */}
        {toDelete && (
          <div className="fixed inset-0 flex justify-center items-center w-full h-full z-50 bg-black bg-opacity-50">
            <div className="relative bg-white rounded-xl shadow p-8">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide="popup-modal"
                onClick={() => setToDelete(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-ennovate-dark-blue w-12 h-12"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-xl font-bold text-ennovate-dark-blue">
                  Remove {name}?
                </h3>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-ennovate-main hover:bg-ennovate-dark-blue font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  style={{ opacity: isDeleting ? 0.7 : 1 }}
                >
                  {isDeleting ? "Deleting..." : "Yes, I'm sure"}
                </button>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-semibold text-ennovate-dark-blue bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
                  onClick={() => setToDelete(false)}
                  disabled={isDeleting}
                  style={{ opacity: isDeleting ? 0.7 : 1 }}
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMember;
