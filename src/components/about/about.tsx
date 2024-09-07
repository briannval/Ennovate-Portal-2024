import { IAboutContent } from "@/constants/about";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTransition, animated } from "react-spring";

const About = ({
  title,
  subtitle,
  content,
  images,
}: {
  title: string;
  subtitle: string;
  content: IAboutContent[];
  images: string[];
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const intervalId: NodeJS.Timeout = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  const transitions = useTransition(currentImageIndex, {
    key: currentImageIndex,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <div
      className="overflow-hidden bg-white py-24 scroll-mt-20 mx-8"
      id="about"
    >
      <div className="mx-auto max-w-screen-xl ">
        <div
          className="mx-auto grid max-w-screen-xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2"
          data-cy="about-grid"
        >
          <div className="lg:pr-8 lg:pt-4 mx-8">
            <div className="lg:max-w-lg">
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ennovate-dark-blue sm:text-5xl">
                {title}
              </h1>
              <h2 className="mt-2 text-xl font-bold leading-8 text-ennovate-dark-blue opacity-70">
                {subtitle}
              </h2>
              <dl className="mt-6 max-w-xl space-y-8 text-base font-medium leading-7 text-gray-500 lg:max-w-none">
                {content.map((c) => (
                  <div className="relative pl-9">
                    <dt className="inline font-bold text-ennovate-dark-blue">
                      {c.icon}
                      {c.heading}
                    </dt>
                    <br />
                    <dd className="inline text-ennovate-dark-blue opacity-60">
                      {c.content}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="relative w-full h-64 sm:h-[34rem] md:-ml-4 lg:-ml-0">
            {transitions((style, index) => (
              <animated.div
                style={style}
                className="absolute inset-0 mx-8 lg:mx-0"
              >
                <Image
                  src={images[index]}
                  alt="Product screenshot"
                  fill
                  className="rounded-xl shadow-xl ring-1 ring-gray-400/10 object-cover"
                />
              </animated.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
