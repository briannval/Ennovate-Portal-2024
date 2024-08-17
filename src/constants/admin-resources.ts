export interface IAdminResourcesAction {
  heading: string;
  subheading: string;
  image: string;
  viewHref: string;
  addHref: string;
}

export const ADMIN_RESOURCES_ACTIONS: IAdminResourcesAction[] = [
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
    viewHref: "/resources/workshops",
    addHref: "#",
  },
  {
    heading: "Previous Business Proposals",
    subheading: "Proposals from Ennovate's future entrepreneurs",
    image: "/previous-business-proposals.jpg",
    viewHref: "/resources/business-proposals",
    addHref: "#",
  },
  {
    heading: "Previous Projects",
    subheading: "High quality, presentable projects from students",
    image: "/previous-projects.jpg",
    viewHref: "/resources/projects",
    addHref: "#",
  },
  {
    heading: "Blog",
    subheading: "Read more and keep up with the latest from Ennovate!",
    image: "/blogs.jpg",
    viewHref: "/resources/blog",
    addHref: "#",
  },
];