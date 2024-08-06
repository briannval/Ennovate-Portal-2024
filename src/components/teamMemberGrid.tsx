import { ITeamMember } from "@/models/TeamMember";
import TeamMember from "./teamMember";

const TeamMemberGrid = ({ teamMembers }: { teamMembers: ITeamMember[] }) => {
  return (
    <div className="grid grid-cols-4 p-8 min-h-[120vh]">
      {teamMembers.map((teamMember) => (
        <TeamMember
          name={teamMember.name}
          email={teamMember.email}
          img={teamMember.image}
          title={teamMember.title}
        />
      ))}
    </div>
  );
};

export default TeamMemberGrid;
