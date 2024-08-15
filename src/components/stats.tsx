"use client";

import { STATS_DATA } from "@/constants/stats";
import { useSpring, animated, useInView } from "react-spring";

const AnimatedNumber = ({ n }: { n: number }) => {
  const [ref, inView] = useInView({
    once: true,
  });

  const { number } = useSpring({
    from: { number: 0 },
    number: inView ? n : 0,
    delay: 100,
    config: { mass: 1, tension: 20, friction: 20 },
  });

  return (
    <animated.span ref={ref}>{number.to((n) => n.toFixed(0))}</animated.span>
  );
};

const Stats = () => {
  return (
    <section className="flex flex-col my-20 scroll-mt-20" id="stats">
      <p className="mt-2 text-4xl text-center font-extrabold tracking-tight text-ennovate-dark-blue sm:text-5xl">
        Our Impact
      </p>
      <p className="mt-2 text-xl text-center font-bold leading-8 text-ennovate-dark-blue opacity-70">
        The team's achievements, quantified.
      </p>
      <div className="mt-10 grid grid-cols-2 text-ennovate-dark-blue lg:grid-cols-4 gap-y-5 lg:gap-y-0 gap-x-5 place-items-center w-full mx-auto max-w-7xl px-5">
        {STATS_DATA.map((stat) => (
          <div
            key={stat.id}
            className="flex flex-col justify-center items-center bg-ennovate-yellow bg-opacity-5 px-4 h-[126px] w-[100%] md:w-[281px] md:h-[192px] rounded-lg justify-self-center"
          >
            <div className="flex flex-row justify-center items-center">
              {stat.icon}
              <p className="font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-9 text-primary ml-2">
                {stat.pre ?? stat.pre}
                <AnimatedNumber n={stat.value} />
              </p>
            </div>
            <p className="font-semibold text-base sm:text-md leading-6 mt-3 md:mt-6 text-center">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
