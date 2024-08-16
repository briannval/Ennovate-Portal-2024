import { ReactNode } from "react";

interface ResourcesLayoutProps {
  children: ReactNode;
}

export default function ResourcesLayout({ children }: ResourcesLayoutProps) {
  return (
    <div className="w-screen max-w-screen-xl min-h-screen py-10">
      {children}
    </div>
  );
}
