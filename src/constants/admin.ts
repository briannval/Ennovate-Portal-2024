
export interface IAdminAction {
  heading: string;
  subheading: string;
  image: string;
  viewHref: string;
  addHref: string;
}

export const ADMIN_ACTIONS: IAdminAction[] = [
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
