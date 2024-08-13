import Image from "next/image";
import Marquee from "react-fast-marquee";

const AFFILIATION_IMAGES = [
  "/ams-logo.png",
  "/enactus-logo.png",
  "/ubc-logo.png",
];

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
        {[...AFFILIATION_IMAGES].map((img, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-center mr-24 bg-white"
            >
              <Image
                src={img}
                alt={`Affiliation ${index}`}
                width={100}
                height={100}
              />
            </div>
          );
        })}
      </Marquee>
    </section>
  );
};

export default Affiliations;
