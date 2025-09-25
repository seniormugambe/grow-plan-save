export interface Wallet {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment' | 'crypto' | 'cash';
  balance: number;
  currency: string;
  color: string;
  icon: string;
  isActive: boolean;
  lastUpdated: Date;
  bankName?: string;
  accountNumber?: string;
}

export interface WalletTransaction {
  id: string;
  walletId: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer';
  category: string;
  description: string;
  date: Date;
  fromWallet?: string;
  toWallet?: string;
}

export interface WalletSummary {
  totalBalance: number;
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  monthlyChange: number;
}