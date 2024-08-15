import { ITeamMember } from "@/models/TeamMember";
import TeamMember from "./teamMember";

const TeamMemberGrid = ({ teamMembers }: { teamMembers: ITeamMember[] }) => {
  return (
    <div className="grid grid-cols-4 p-8 min-h-[60vh]">
      {teamMembers.map((teamMember, index) => (
        <TeamMember
          key={index}
          name={teamMember.name}
          email={teamMember.email}
          image={teamMember.image}
          title={teamMember.title}
        />
      ))}
    </div>
  );
};

export default TeamMemberGrid;
