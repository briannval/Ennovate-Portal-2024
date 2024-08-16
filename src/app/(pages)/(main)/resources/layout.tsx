import Breadcrumb from "@/components/breadCrumb";
import { ReactNode } from "react";

interface ResourcesLayoutProps {
  children: ReactNode;
}

export default function ResourcesLayout({ children }: ResourcesLayoutProps) {
  return (
    <div className="w-screen max-w-screen-xl min-h-screen py-10">
      <Breadcrumb />
      {children}
    </div>
  );
}
