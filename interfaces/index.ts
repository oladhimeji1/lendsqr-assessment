export interface KarmaApiResponse {
  blacklisted?: boolean;
  [key: string]: any;
}
export interface KycDocument {
  url: string;
  type_id: number;
  sub_type_id: number;
}

export interface CreateUserData {
  phone_number: string;
  name: string;
  bvn: string;
  bvn_phone_number: string;
  dob: string;
  email: string;
  bank_code: string;
  state: string;
  lga: string;
  city: string;
  address: string;
  photo_url: string;
  documents: KycDocument[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  balance: number;
};

export interface User extends CreateUserData {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface Wallet {
  id: number;
  user_id: number;
  org_id?: number;
  savings_id?: string;
  account_name?: string;
  account_no?: string;
  provider: string;
  type: string;
  currency: string;
  account_balance: number;
  balance_last_updated: string;
  is_primary: boolean;
  pending_transaction: number;
  created_on: string;
  created_by?: number;
  modified_on?: string;
  modified_by?: number;
  deleted_flag: boolean;
  deleted_on?: string;
  deleted_by?: number;
}


export interface TransferResult {
  message: string;
  senderBalance: number;
  receiverBalance: number;
}

export type TransactionType = "fund" | "withdraw" | "transfer";

export interface Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  sender_id?: number;
  receiver_id?: number;
  reference: string;
  created_at: string;
  updated_at: string;
}