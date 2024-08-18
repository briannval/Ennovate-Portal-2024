"use client";

import BusinessProposal from "@/components/businessProposal";
import Loading from "@/components/loading";
import { IBusinessProposal } from "@/models/BusinessProposal";
import PageCenteringWrapper from "@/wrappers/pageCenteringWrapper";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BusinessProposals() {
  const [businessProposals, setBusinessProposals] = useState<
    IBusinessProposal[] | null
  >(null);

  useEffect(() => {
    const initializeData = async () => {
      const res = await axios.get("/api/business-proposals/query");
      setBusinessProposals(res.data);
    };

    initializeData();
  }, []);

  if (!businessProposals) {
    return (
      <PageCenteringWrapper>
        <Loading />
      </PageCenteringWrapper>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mx-8 mt-8">
      {businessProposals.map((businessProposal, index) => (
        <BusinessProposal key={index} businessProposal={businessProposal} />
      ))}
    </div>
  );
}
