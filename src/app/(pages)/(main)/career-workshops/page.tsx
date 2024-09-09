"use client";

import About from "@/components/about/about";
import {
  ABOUT_CAREER_WORKSHOPS_CONTENT,
  ABOUT_CAREER_WORKSHOPS_IMAGES,
  ABOUT_CAREER_WORKSHOPS_SUBTITLE,
  ABOUT_CAREER_WORKSHOPS_TITLE,
} from "@/constants/about";
import PageCenteringWrapper from "@/wrappers/pageCenteringWrapper";

export default function CareerWorkshops() {
  return (
    <PageCenteringWrapper>
      <About
        title={ABOUT_CAREER_WORKSHOPS_TITLE}
        subtitle={ABOUT_CAREER_WORKSHOPS_SUBTITLE}
        content={ABOUT_CAREER_WORKSHOPS_CONTENT}
        images={ABOUT_CAREER_WORKSHOPS_IMAGES}
        flipped
      />
    </PageCenteringWrapper>
  );
}
