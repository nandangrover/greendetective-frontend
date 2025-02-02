export interface BusinessProfile {
  name: string;
  website: string;
  industry: string;
  size: string;
}

export interface UserProfile {
  job_title: string;
  phone: string;
  business: BusinessProfile;
}

export interface User {
  id: string;
  email: string;
  name: string;
  profile: UserProfile;
}

export interface Tokens {
  access: string;
  refresh: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  tokens: Tokens | null;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (signupData: {
    username: string
    email: string
    password: string
    invite_code: string
    profile: {
      job_title: string
      phone: string
      business: {
        name: string
        website: string
        industry: string
        size: string
      }
    }
  }) => Promise<void>;
}