"use client";

import About from "@/components/about/about";
import Affiliations from "@/components/affiliations/affiliations";
import Landing from "@/components/landing/landing";
import Stats from "@/components/stats/stats";
import PageCenteringWrapper from "@/wrappers/pageCenteringWrapper";

export default function Home() {
  return (
    <PageCenteringWrapper>
      <Landing />
      <About />
      <Stats />
      <Affiliations />
    </PageCenteringWrapper>
  );
}
