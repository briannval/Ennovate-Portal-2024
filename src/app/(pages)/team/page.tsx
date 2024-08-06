import Search from "@/components/search";
import TeamMember from "@/components/teamMember";

export default function Team() {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-full">
      <h1 className="text-center font-bold text-4xl mt-8 text-ennovate-dark-blue">
        Get to know us!
      </h1>
      <Search />
      <TeamMember
        name="Arisha Ahmed"
        email="test email"
        img="/arisha-ahmed.jpg"
        title="test"
      />
    </div>
  );
}
