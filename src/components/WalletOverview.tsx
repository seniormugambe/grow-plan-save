import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Wallet, 
  CreditCard, 
  PiggyBank, 
  TrendingUp, 
  Bitcoin, 
  Plus,
  Eye,
  EyeOff,
  MoreHorizontal
} from "lucide-react";
import { mockWallets } from "@/data/wallets";
import { Wallet as WalletType } from "@/types/wallet";
import { useState } from "react";

const iconMap = {
  Wallet,
  CreditCard,
  PiggyBank,
  TrendingUp,
  Bitcoin,
};

const getWalletTypeLabel = (type: WalletType['type']) => {
  const labels = {
    checking: 'Checking',
    savings: 'Savings',
    credit: 'Credit Card',
    investment: 'Investment',
    crypto: 'Crypto',
    cash: 'Cash'
  };
  return labels[type];
};

export const WalletOverview = () => {
  const [showBalances, setShowBalances] = useState(true);
  const [wallets] = useState(mockWallets);

  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
  const totalAssets = wallets
    .filter(w => w.balance > 0)
    .reduce((sum, wallet) => sum + wallet.balance, 0);
  const totalLiabilities = Math.abs(wallets
    .filter(w => w.balance < 0)
    .reduce((sum, wallet) => sum + wallet.balance, 0));

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            Wallet Overview
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBalances(!showBalances)}
            >
              {showBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
            <Button size="sm" variant="finance">
              <Plus className="w-4 h-4 mr-2" />
              Add Wallet
            </Button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {showBalances ? `$${totalBalance.toLocaleString()}` : '••••••'}
            </div>
            <div className="text-sm text-muted-foreground">Net Worth</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {showBalances ? `$${totalAssets.toLocaleString()}` : '••••••'}
            </div>
            <div className="text-sm text-muted-foreground">Assets</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-expense-red">
              {showBalances ? `$${totalLiabilities.toLocaleString()}` : '••••••'}
            </div>
            <div className="text-sm text-muted-foreground">Liabilities</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {wallets.map((wallet) => {
          const IconComponent = iconMap[wallet.icon as keyof typeof iconMap] || Wallet;
          const isNegative = wallet.balance < 0;
          
          return (
            <div key={wallet.id} className="flex items-center justify-between p-4 rounded-lg border bg-gradient-card hover:shadow-card transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${wallet.color}/10`}>
                  <IconComponent className={`w-5 h-5 ${wallet.color.replace('bg-', 'text-')}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{wallet.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {getWalletTypeLabel(wallet.type)}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {wallet.bankName && `${wallet.bankName} • `}
                    {wallet.accountNumber}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className={`font-semibold ${isNegative ? 'text-expense-red' : 'text-foreground'}`}>
                    {showBalances ? 
                      `${isNegative ? '-' : ''}$${Math.abs(wallet.balance).toLocaleString()}` : 
                      '••••••'
                    }
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {wallet.currency}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};