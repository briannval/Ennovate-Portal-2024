import About from "@/components/about";
import Landing from "@/components/landing";
import Stats from "@/components/stats";
import PageCenteringWrapper from "@/wrappers/pageCenteringWrapper";

export default function Home() {
  return (
    <PageCenteringWrapper>
      <Landing />
      <About />
      <Stats />
    </PageCenteringWrapper>
  );
}
