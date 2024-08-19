"use client";

import { FOOTER_SOCIALS_LINKS } from "@/constants/footer";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-ennovate-main py-8 w-screen">
      <div className="flex flex-col items-center px-8">
        <h2 className="font-bold text-xl md:text-2xl mb-6 text-center text-white">
          Interested in bringing Ennovate to your class?
        </h2>
        <button className="text-ennovate-dark-blue text-xl md:text-2xl font-extrabold bg-ennovate-yellow hover:bg-white rounded-3xl py-2 px-6 text-center mb-12">
          CONTACT US
        </button>
        <h2 className="font-extralight text-xl md:text-2xl mb-6 text-center text-white">
          Made with love from the Ennovate Team ♥
        </h2>
        <div className="flex justify-between w-full max-w-screen-xl px-4">
          <div className="flex">
            {FOOTER_SOCIALS_LINKS.map((footerSocialsLink, index) => (
              <Link
                key={index}
                href={footerSocialsLink.href}
                className="max-w-[20px] md:max-w-[30px] m-[5px]"
              >
                <Image
                  src={footerSocialsLink.img}
                  alt="Social Image"
                  priority
                  width={30}
                  height={30}
                />
              </Link>
            ))}
          </div>
          <p
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            className="cursor-pointer text-white font-bold"
          >
            BACK TO THE TOP
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
