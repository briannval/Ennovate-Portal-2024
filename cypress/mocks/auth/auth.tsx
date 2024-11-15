import { AuthContext } from "@/contexts/AuthContext";
import { IdTokenResult, User } from "firebase/auth";

interface MockAuthProviderProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
}

const mockUser: User = {
  uid: 'mock-uid',
  email: 'mock-user@example.com',
  displayName: 'Mock User',
  photoURL: 'http://example.com/photo.jpg',
  emailVerified: true,
  isAnonymous: false,
  metadata: {
    creationTime: undefined,
  },
  providerData: [],
  refreshToken: "",
  tenantId: null,
  delete: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  getIdToken: function (forceRefresh?: boolean | undefined): Promise<string> {
    throw new Error("Function not implemented.");
  },
  getIdTokenResult: function (forceRefresh?: boolean | undefined): Promise<IdTokenResult> {
    throw new Error("Function not implemented.");
  },
  reload: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  toJSON: function (): object {
    throw new Error("Function not implemented.");
  },
  phoneNumber: null,
  providerId: ""
};


export const MockAuthProvider = ({
  children,
  isAuthenticated = true,
}: MockAuthProviderProps) => {
  const mockAuthContext = {
    isAuthenticated,
    isLoading: false,
    login: cy.stub(),
    logout: cy.stub(),
    user: mockUser,
  };

  return (
    <AuthContext.Provider value={mockAuthContext}>
      {children}
    </AuthContext.Provider>
  );
};
