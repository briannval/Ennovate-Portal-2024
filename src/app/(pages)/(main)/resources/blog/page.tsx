import BlogSection from "@/components/blogSection";
import Loading from "@/components/loading";
import { Suspense } from "react";

export default function Blog() {
  return (
    <Suspense fallback={<Loading />}>
      <BlogSection featured={false} />
    </Suspense>
  );
}
