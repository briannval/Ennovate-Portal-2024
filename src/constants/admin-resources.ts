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
    image: "/admin/team-members.webp",
    viewHref: "/team",
    addHref: "/admin/team",
  },
  {
    heading: "Previous Business Proposals & Slides",
    subheading: "Proposals from Ennovate's future entrepreneurs",
    image: "/admin/previous-business-proposals.webp",
    viewHref: "/resources/business-proposals",
    addHref: "/admin/business-proposals",
  },
  {
    heading: "Business Workshops",
    subheading: "Interactive business education workshops for students",
    image: "/admin/workshops.webp",
    viewHref: "/resources/business-workshops",
    addHref: "/admin/business-workshops",
  },
  {
    heading: "Previous Projects",
    subheading: "High quality, presentable projects from students",
    image: "/admin/previous-projects.webp",
    viewHref: "/resources/projects",
    addHref: "/admin/projects",
  },
  {
    heading: "Blog",
    subheading: "Read more and keep up with the latest from Ennovate!",
    image: "/admin/blogs.webp",
    viewHref: "/resources/blog",
    addHref: "/admin/blog",
  },
];
