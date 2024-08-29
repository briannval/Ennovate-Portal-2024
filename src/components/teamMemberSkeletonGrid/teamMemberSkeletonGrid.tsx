import TeamMemberSkeleton from "./teamMemberSkeleton";

const TeamMemberSkeletonGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-8 min-h-[60vh]">
      {[...Array(12)].map((_, i) => (
        <TeamMemberSkeleton key={i} />
      ))}
    </div>
  );
};

export default TeamMemberSkeletonGrid;
