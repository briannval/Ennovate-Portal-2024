export interface IAboutContent {
  heading: string;
  content: string;
  icon: JSX.Element;
}

export const ABOUT_ENNOVATE_TITLE = "About Us";

export const ABOUT_ENNOVATE_SUBTITLE = "Why be a part of Ennovate?";

export const ABOUT_ENNOVATE_IMAGES = [
  "/about/about-ennovate-1.webp",
  "/about/about-ennovate-2.webp",
  "/about/about-ennovate-3.webp",
];

export const ABOUT_ENNOVATE_CONTENT: IAboutContent[] = [
  {
    heading: "Entrepreneurial Education",
    content:
      "4-month, intensive project empowering high school students with essential business and soft skills through interactive workshops.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="absolute left-1 top-1 h-5 w-5 text-ennovate-dark-blue"
        viewBox="0 0 16 16"
      >
        <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5" />
        <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85z" />
      </svg>
    ),
  },
  {
    heading: "Support & Guidance",
    content:
      "With the team's guidance, students create mini social-enterprises addressing social or environmental concerns, replicating real-world businesses.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="absolute left-1 top-1 h-5 w-5 text-ennovate-dark-blue"
        viewBox="0 0 16 16"
      >
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
      </svg>
    ),
  },
  {
    heading: "Industry Professionals",
    content:
      "At the very end of the program, students will pitch their developed businesses to a panel of industry professionals, showcasing all of their hard work.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="absolute left-1 top-1 h-5 w-5 text-ennovate-dark-blue"
        viewBox="0 0 16 16"
      >
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
      </svg>
    ),
  },
];
