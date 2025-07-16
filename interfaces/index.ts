export interface KarmaApiResponse {
  blacklisted?: boolean;
  [key: string]: any;
}

export interface CreateUserData {
  name: string;
  email: string;
  bvn: string;
};

export interface User {
  id: number;
  name: string;
  email: string;
  bvn: string;
  balance: number;
};


