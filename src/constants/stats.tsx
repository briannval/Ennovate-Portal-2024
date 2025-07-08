import { ReactElement } from "react";

const STAT_ICON_CLASSNAME = "w-[35px] h-[35px] md:w-[50px] md:h-[50px] mr-2";

interface IStatsData {
  id: number;
  icon: ReactElement;
  value: number;
  label: string;
  pre?: string;
}

export const STATS_DATA: IStatsData[] = [
  {
    id: 1,
    icon: (
      <svg
        className={STAT_ICON_CLASSNAME}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M39.37 18.432c0 3.058-.906 5.862-2.466 8.203a14.728 14.728 0 0 1-10.079 6.367c-.717.127-1.455.19-2.214.19-.759 0-1.497-.063-2.214-.19a14.728 14.728 0 0 1-10.078-6.368 14.692 14.692 0 0 1-2.467-8.202c0-8.16 6.6-14.76 14.76-14.76s14.759 6.6 14.759 14.76Z"
          stroke="#ffbc1c"
          strokeWidth="3.473"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="m44.712 38.17-3.431.83a2.063 2.063 0 0 0-1.539 1.572l-.728 3.122c-.09.384-.281.734-.554 1.012a2.068 2.068 0 0 1-.992.564c-.375.09-.768.073-1.134-.052a2.078 2.078 0 0 1-.938-.653l-9.92-11.64-9.92 11.661a2.078 2.078 0 0 1-.938.653 2.038 2.038 0 0 1-1.134.052 2.067 2.067 0 0 1-.992-.563 2.137 2.137 0 0 1-.554-1.012l-.728-3.123a2.13 2.13 0 0 0-.55-1.01 2.06 2.06 0 0 0-.988-.562L6.24 38.19a2.073 2.073 0 0 1-.956-.533 2.14 2.14 0 0 1-.563-.953 2.175 2.175 0 0 1-.015-1.113c.091-.366.276-.7.536-.97l8.11-8.284a14.672 14.672 0 0 0 4.307 4.281 14.34 14.34 0 0 0 5.634 2.134 12.29 12.29 0 0 0 2.183.191c.749 0 1.477-.063 2.184-.19 4.138-.617 7.694-3.017 9.94-6.416l8.11 8.285c1.144 1.147.583 3.165-.998 3.547Zm-18.03-26.532 1.227 2.507c.167.34.603.68.998.743l2.226.383c1.414.233 1.747 1.296.727 2.336l-1.726 1.764c-.29.297-.457.87-.353 1.295l.499 2.188c.395 1.721-.5 2.4-1.996 1.487l-2.08-1.253a1.434 1.434 0 0 0-1.372 0l-2.08 1.253c-1.497.892-2.392.234-1.996-1.487l.499-2.188c.083-.403-.063-.998-.354-1.295l-1.726-1.764c-1.019-1.04-.686-2.081.728-2.336l2.225-.383c.375-.063.811-.403.977-.743l1.227-2.507c.604-1.36 1.685-1.36 2.35 0Z"
          stroke="#ffbc1c"
          strokeWidth="3.473"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    ),
    value: 220,
    label: "High School Students Impacted",
  },
  {
    id: 2,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={STAT_ICON_CLASSNAME}
        fill="#ffbc1c"
        viewBox="0 0 16 16"
      >
        <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5m1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0M1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5" />
      </svg>
    ),
    value: 50,
    label: "Student-Led Businesses",
  },
  {
    id: 3,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={STAT_ICON_CLASSNAME}
        viewBox="0 0 16 16"
        fill="#ffbc1c"
      >
        <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
        <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z" />
      </svg>
    ),
    value: 14000,
    label: "Revenue Generated",
    pre: "$",
  },
  {
    id: 4,
    icon: (
      <svg
        className={STAT_ICON_CLASSNAME}
        viewBox="0 0 51 50"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <path
          d="M45.571 12.006 27.046 30.531l-7.719-7.718L5.434 36.706"
          stroke="#ffbc1c"
          strokeWidth="4.341"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M45.569 24.356v-12.35h-12.35"
          stroke="#ffbc1c"
          strokeWidth="4.341"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    ),
    value: 775,
    label: "Members Influenced",
  },
];
