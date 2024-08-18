import PageCenteringWrapper from "@/wrappers/pageCenteringWrapper";

export default function Test() {
  return (
    <PageCenteringWrapper>
      <embed
        src="https://drive.google.com/file/d/1ULMfyRjO2Tv2wtXPEB72Lsr7HN2ih-Xn/preview"
        type="application/pdf"
        className="w-screen max-w-screen-md h-[600px] rounded-lg"
      />
    </PageCenteringWrapper>
  );
}

// working drive embed
