import About from "@/components/about";
import Landing from "@/components/landing";
import PageCenteringWrapper from "@/wrappers/pageCenteringWrapper";

export default function Home() {
  return (
    <PageCenteringWrapper>
      <Landing />
      <About />
    </PageCenteringWrapper>
  );
}
