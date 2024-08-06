import TeamMemberSkeleton from "./teamMemberSkeleton";

const TeamMemberSkeletonGrid = () => {
  return (
    <div className="grid grid-cols-4 gap-2 mt-4 min-h-full">
      {[...Array(12)].map((_, i) => (
        <TeamMemberSkeleton key={i} />
      ))}
    </div>
  );
};

export default TeamMemberSkeletonGrid;
