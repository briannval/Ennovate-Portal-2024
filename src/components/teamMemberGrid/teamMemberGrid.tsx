import { ITeamMember } from "@/models/TeamMember";
import TeamMember from "../teamMember/teamMember";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

const AddTeamMemberCTA = () => {
  return (
    <Link href="/admin/team">
      <div className="relative inline-block">
        <div className="relative h-[250px] w-[250px] group cursor-pointer transition-all duration-300 ease-in-out overflow-hidden m-[25px] rounded-[25px] bg-ennovate-yellow flex items-center justify-center bg-opacity-70 hover:bg-opacity-100">
          <span className="text-white text-6xl font-bold group-hover:font-extrabold">
            +
          </span>
        </div>
      </div>
    </Link>
  );
};

const TeamMemberGrid = ({ teamMembers }: { teamMembers: ITeamMember[] }) => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-8 min-h-[60vh]">
        {teamMembers.map((teamMember, index) => (
          <TeamMember key={index} teamMember={teamMember} />
        ))}
        {isAuthenticated && teamMembers.length < 12 && <AddTeamMemberCTA />}
      </div>
      {isAuthenticated && teamMembers.length == 12 && <AddTeamMemberCTA />}
    </>
  );
};

export default TeamMemberGrid;
