import { Wallet } from '@/types/wallet';

export const mockWallets: Wallet[] = [
  {
    id: '1',
    name: 'Main Checking',
    type: 'checking',
    balance: 4250.00,
    currency: 'USD',
    color: 'bg-blue-500',
    icon: 'CreditCard',
    isActive: true,
    lastUpdated: new Date(),
    bankName: 'Chase Bank',
    accountNumber: '****1234'
  },
  {
    id: '2',
    name: 'Emergency Savings',
    type: 'savings',
    balance: 8500.00,
    currency: 'USD',
    color: 'bg-green-500',
    icon: 'PiggyBank',
    isActive: true,
    lastUpdated: new Date(),
    bankName: 'Chase Bank',
    accountNumber: '****5678'
  },
  {
    id: '3',
    name: 'Investment Portfolio',
    type: 'investment',
    balance: 15750.00,
    currency: 'USD',
    color: 'bg-purple-500',
    icon: 'TrendingUp',
    isActive: true,
    lastUpdated: new Date(),
    bankName: 'Fidelity',
    accountNumber: '****9012'
  },
  {
    id: '4',
    name: 'Credit Card',
    type: 'credit',
    balance: -1200.00,
    currency: 'USD',
    color: 'bg-red-500',
    icon: 'CreditCard',
    isActive: true,
    lastUpdated: new Date(),
    bankName: 'Capital One',
    accountNumber: '****3456'
  },
  {
    id: '5',
    name: 'Crypto Wallet',
    type: 'crypto',
    balance: 2800.00,
    currency: 'USD',
    color: 'bg-orange-500',
    icon: 'Bitcoin',
    isActive: true,
    lastUpdated: new Date(),
    bankName: 'Coinbase',
    accountNumber: '****7890'
  },
  {
    id: '6',
    name: 'Cash Wallet',
    type: 'cash',
    balance: 350.00,
    currency: 'USD',
    color: 'bg-gray-500',
    icon: 'Wallet',
    isActive: true,
    lastUpdated: new Date()
  }
];