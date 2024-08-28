"use client";

import PageCenteringWrapper from "@/wrappers/pageCenteringWrapper";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Test() {
  const [img, setImg] = useState("");

  useEffect(() => {
    const setData = async () => {
      const res = await axios.post("/api/blog/query");
      console.log(res.data);
    };
    setData();
  }, []);

  return (
    <PageCenteringWrapper>
      <Image
        src={
          "https://miro.medium.com/v2/resize:fit:1200/1*yOKEz9kDZLy91JK1KuRGIw.png"
        }
        alt="test"
        width={1000}
        height={1000}
      />
    </PageCenteringWrapper>
  );
}

// working drive embed
