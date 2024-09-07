"use client";

import About from "@/components/about/about";
import Affiliations from "@/components/affiliations/affiliations";
import Landing from "@/components/landing/landing";
import Stats from "@/components/stats/stats";
import {
  ABOUT_ENNOVATE_CONTENT,
  ABOUT_ENNOVATE_IMAGES,
  ABOUT_ENNOVATE_SUBTITLE,
  ABOUT_ENNOVATE_TITLE,
} from "@/constants/about";
import PageCenteringWrapper from "@/wrappers/pageCenteringWrapper";

export default function Home() {
  return (
    <PageCenteringWrapper>
      <Landing />
      <About
        title={ABOUT_ENNOVATE_TITLE}
        subtitle={ABOUT_ENNOVATE_SUBTITLE}
        content={ABOUT_ENNOVATE_CONTENT}
        images={ABOUT_ENNOVATE_IMAGES}
      />
      <Stats />
      <Affiliations />
    </PageCenteringWrapper>
  );
}
