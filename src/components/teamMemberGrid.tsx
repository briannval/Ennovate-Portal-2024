import { ITeamMember } from "@/models/TeamMember";
import TeamMember from "./teamMember";

const TeamMemberGrid = ({ teamMembers }: { teamMembers: ITeamMember[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-8 min-h-[60vh]">
      {teamMembers.map((teamMember, index) => (
        <TeamMember key={index} teamMember={teamMember} />
      ))}
    </div>
  );
};

export default TeamMemberGrid;
