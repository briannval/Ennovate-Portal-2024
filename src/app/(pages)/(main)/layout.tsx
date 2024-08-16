import WithNavbarWrapper from "@/wrappers/withNavbarWrapper";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return <WithNavbarWrapper>{children}</WithNavbarWrapper>;
}
