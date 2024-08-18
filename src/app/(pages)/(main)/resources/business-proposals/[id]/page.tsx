"use client";

import { getBusinessProposalById } from "@/actions/db";
import Loading from "@/components/loading";
import { IBusinessProposal } from "@/models/BusinessProposal";
import PageCenteringWrapper from "@/wrappers/pageCenteringWrapper";
import { useEffect, useState } from "react";

export default function BusinessProposals({
  params,
}: {
  params: { id: string };
}) {
  const [businessProposal, setBusinessProposal] =
    useState<IBusinessProposal | null>(null);

  useEffect(() => {
    const setData = async () => {
      const data = await getBusinessProposalById(params.id);
      setBusinessProposal(data);
    };
    setData();
  }, [params.id]);

  return (
    <PageCenteringWrapper>
      {businessProposal ? (
        <>
          <h1 className="text-4xl text-center font-extrabold tracking-tight text-ennovate-dark-blue sm:text-5xl mt-4">
            {businessProposal.name}
          </h1>
          <p className="mt-2 text-xl text-center font-bold leading-8 text-ennovate-dark-blue opacity-70 mb-8">
            {businessProposal.description}
          </p>
          <embed
            src={businessProposal.drive}
            type="application/pdf"
            className="w-screen max-w-screen-md h-[600px] rounded-lg mx-8"
          />
        </>
      ) : (
        <Loading />
      )}
    </PageCenteringWrapper>
  );
}
