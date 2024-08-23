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
    heading: "Previous Business Proposals",
    subheading: "Proposals from Ennovate's future entrepreneurs",
    image: "/previous-business-proposals.jpg",
    viewHref: "/resources/business-proposals",
    addHref: "/admin/business-proposals",
  },
  {
    heading: "Workshops",
    subheading: "Interactive business education workshops for students",
    image: "/workshops.jpg",
    viewHref: "/resources/workshops",
    addHref: "/admin/workshops",
  },
  {
    heading: "Previous Projects",
    subheading: "High quality, presentable projects from students",
    image: "/previous-projects.jpg",
    viewHref: "/resources/projects",
    addHref: "/admin/projects",
  },
  {
    heading: "Blog",
    subheading: "Read more and keep up with the latest from Ennovate!",
    image: "/blogs.jpg",
    viewHref: "/resources/blog",
    addHref: "/admin/blog",
  },
];
