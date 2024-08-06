import TeamMemberSkeleton from "./teamMemberSkeleton";

const TeamMemberSkeletonGrid = () => {
  return (
    <div className="grid grid-cols-4 p-8 min-h-[120vh]">
      {[...Array(12)].map((_, i) => (
        <TeamMemberSkeleton key={i} />
      ))}
    </div>
  );
};

export default TeamMemberSkeletonGrid;
