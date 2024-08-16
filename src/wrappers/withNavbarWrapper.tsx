"use client";

interface WithNavbarWrapperProps {
  children: React.ReactNode;
}

const WithNavbarWrapper = ({ children }: WithNavbarWrapperProps) => {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 5rem)",
        marginTop: "5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};

export default WithNavbarWrapper;
