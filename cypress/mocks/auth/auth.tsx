import { AuthContext } from "@/contexts/auth";

interface MockAuthProviderProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
}

export const MockAuthProvider = ({
  children,
  isAuthenticated = true,
}: MockAuthProviderProps) => {
  const mockAuthContext = {
    isAuthenticated,
    isLoading: false,
    login: cy.stub(),
    logout: cy.stub(),
  };

  return (
    <AuthContext.Provider value={mockAuthContext}>
      {children}
    </AuthContext.Provider>
  );
};
