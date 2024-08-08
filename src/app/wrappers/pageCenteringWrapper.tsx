"use client";

interface PageCenteringWrapperProps {
  children: React.ReactNode;
}

const PageCenteringWrapper = ({ children }: PageCenteringWrapperProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-full">
      {children}
    </div>
  );
};

export default PageCenteringWrapper;
