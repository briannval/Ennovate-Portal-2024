import Breadcrumb from "@/components/breadCrumb/breadCrumb";
import { ReactNode } from "react";

interface ResourcesLayoutProps {
  children: ReactNode;
}

export default function ResourcesLayout({ children }: ResourcesLayoutProps) {
  return (
    <div className="w-screen max-w-screen-xl min-h-screen py-10">
      <Breadcrumb />
      <hr className="mx-8 my-4 border-t-2 border-ennovate-dark-blue border-opacity-50" />
      {children}
    </div>
  );
}
