import BlogSection from "@/components/blogSection/blogSection";
import Loading from "@/components/loading/loading";
import { Suspense } from "react";

export default function Blog() {
  return (
    <Suspense fallback={<Loading />}>
      <BlogSection featured={false} />
    </Suspense>
  );
}
