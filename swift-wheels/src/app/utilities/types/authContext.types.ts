export interface AuthContextProps {
  onLoginSubmit: (data: any) => Promise<void>;
  userId: string;
  userEmail: string;
  token: string;
  isAuthenticated: boolean;
}
