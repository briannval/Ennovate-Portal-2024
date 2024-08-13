import { AFFILIATION_IMAGES } from "@/constants/affiliations";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const Affiliations = () => {
  return (
    <section
      className="flex flex-col my-20 scroll-mt-20 max-w-screen-xl"
      id="stats"
    >
      <p className="mt-2 text-4xl text-center font-extrabold tracking-tight text-ennovate-dark-blue sm:text-5xl">
        Affiliations & Sponsors
      </p>
      <p className="mt-2 text-xl text-center font-bold leading-8 text-ennovate-dark-blue opacity-70">
        Who we work with.
      </p>
      <Marquee
        speed={50}
        pauseOnClick={true}
        pauseOnHover={true}
        className="mt-16"
        autoFill={true}
      >
        {AFFILIATION_IMAGES.map((img, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center mr-24 group"
          >
            <div className="w-48 h-56 bg-white flex items-center justify-center hover:bg-ennovate-main hover:bg-opacity-5">
              <Image
                src={img.src}
                alt={`Affiliation ${index}`}
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <p className="mt-2 text-center text-ennovate-main font-extrabold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {img.name.toUpperCase()}
            </p>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default Affiliations;
