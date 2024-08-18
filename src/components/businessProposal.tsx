import { IBusinessProposal } from "@/models/BusinessProposal";
import Image from "next/image";
import Link from "next/link";

const BusinessProposal = ({
  businessProposal,
}: {
  businessProposal: IBusinessProposal;
}) => {
  return (
    <Link href={`/resources/business-proposals/${businessProposal._id}`}>
      <div className="max-w-sm bg-white border border-ennovate-main rounded-lg hover:shadow hover:shadow-ennovate-main">
        <div className="relative w-full h-64">
          <Image
            className="rounded-t-lg"
            src={businessProposal.image}
            alt="Noteworthy technology acquisitions 2021"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-5">
          <h5 className="text-2xl font-bold tracking-tight text-ennovate-dark-blue">
            {businessProposal.name}
          </h5>
          <h5 className="mb-2 text-xl font-medium tracking-tight text-ennovate-dark-blue opacity-80">
            {businessProposal.description}
          </h5>
        </div>
      </div>
    </Link>
  );
};

export default BusinessProposal;
