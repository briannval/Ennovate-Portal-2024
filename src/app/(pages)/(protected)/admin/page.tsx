import Image from "next/image";

interface IAdminAction {
  heading: string;
  subheading: string;
  image: string;
  viewHref: string;
  addHref: string;
}

const adminActions: IAdminAction[] = [
  {
    heading: "Team Members",
    subheading: "The great individuals keeping Ennovate running",
    image: "/team-members.jpg",
    viewHref: "/team",
    addHref: "/admin/team",
  },
  {
    heading: "Workshops",
    subheading: "Interactive workshops to prepare students' careers",
    image: "/workshops.jpg",
    viewHref: "#",
    addHref: "#",
  },
  {
    heading: "Previous Business Proposals",
    subheading: "Proposals from Ennovate's future entrepreneurs",
    image: "/previous-business-proposals.jpg",
    viewHref: "#",
    addHref: "#",
  },
  {
    heading: "Previous Projects",
    subheading: "High quality, presentable projects from students",
    image: "/previous-projects.jpg",
    viewHref: "#",
    addHref: "#",
  },
  {
    heading: "Blog",
    subheading: "Read more and keep up with the latest from Ennovate!",
    image: "/blogs.jpg",
    viewHref: "#",
    addHref: "#",
  },
];

function AdminAction({
  image,
  heading,
  subheading,
  viewHref,
  addHref,
}: IAdminAction) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt="Noteworthy technology acquisitions 2021"
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {heading}
        </h5>
        <p className="mb-3 font-normal text-gray-700">{subheading}</p>
        <a
          href={addHref}
          className="inline-flex items-center px-3 py-2 text-md font-medium text-center text-white bg-ennovate-main rounded-lg hover:bg-ennovate-dark-blue"
        >
          View
        </a>
        <a
          href={addHref}
          className="inline-flex items-center px-3 py-2 text-md font-medium text-center text-white bg-ennovate-main rounded-lg hover:bg-ennovate-dark-blue ml-2"
        >
          Add More
        </a>
      </div>
    </div>
  );
}

export default function Admin() {
  return (
    <div className="flex flex-col p-20">
      <p className="text-4xl text-center font-extrabold tracking-tight text-ennovate-dark-blue sm:text-5xl">
        Admin Panel
      </p>
      <p className="mt-2 text-xl text-center font-bold leading-8 text-ennovate-dark-blue opacity-70 mb-8">
        Update teachers and students with one click.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {[...adminActions].map(
          ({ image, heading, subheading, viewHref, addHref }, index) => {
            return (
              <AdminAction
                image={image}
                heading={heading}
                subheading={subheading}
                viewHref={viewHref}
                addHref={addHref}
                key={index}
              />
            );
          },
        )}
      </div>
    </div>
  );
}