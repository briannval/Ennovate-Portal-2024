"use client";

import About from "@/components/about/about";
import {
  ABOUT_MENTORSHIP_CONTENT,
  ABOUT_MENTORSHIP_IMAGES,
  ABOUT_MENTORSHIP_SUBTITLE,
  ABOUT_MENTORSHIP_TITLE,
} from "@/constants/about";
import PageCenteringWrapper from "@/wrappers/pageCenteringWrapper";

export default function MentorshipPage() {
  return (
    <PageCenteringWrapper>
      <About
        title={ABOUT_MENTORSHIP_TITLE}
        subtitle={ABOUT_MENTORSHIP_SUBTITLE}
        content={ABOUT_MENTORSHIP_CONTENT}
        images={ABOUT_MENTORSHIP_IMAGES}
        flipped
      />
    </PageCenteringWrapper>
  );
}
