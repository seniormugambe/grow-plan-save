import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  ArrowLeftRight,
  Plus,
  Search,
  Filter,
  Calendar,
  Wallet
} from "lucide-react";
import { mockWallets } from "@/data/wallets";
import { mockTransactions } from "@/data/transactions";
import { useState } from "react";

export const WalletManager = () => {
  const [selectedWallet, setSelectedWallet] = useState(mockWallets[0]);
  const [transactions] = useState(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const walletTransactions = transactions.filter(t => 
    t.walletId === selectedWallet.id &&
    (searchTerm === '' || t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
     t.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterType === 'all' || t.type === filterType)
  );

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'income': return <ArrowDownLeft className="w-4 h-4 text-success" />;
      case 'expense': return <ArrowUpRight className="w-4 h-4 text-expense-red" />;
      case 'transfer': return <ArrowLeftRight className="w-4 h-4 text-primary" />;
      default: return <ArrowUpRight className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Wallet Selector */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            Wallet Manager
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {mockWallets.map((wallet) => (
              <Button
                key={wallet.id}
                variant={selectedWallet.id === wallet.id ? "default" : "outline"}
                className="h-auto p-3 flex flex-col items-center gap-2"
                onClick={() => setSelectedWallet(wallet)}
              >
                <div className={`w-8 h-8 rounded-lg ${wallet.color} flex items-center justify-center`}>
                  <Wallet className="w-4 h-4 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-xs font-medium">{wallet.name}</div>
                  <div className="text-xs text-muted-foreground">
                    ${wallet.balance.toLocaleString()}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Wallet Details */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${selectedWallet.color}`}>
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{selectedWallet.name}</h3>
                <p className="text-muted-foreground">
                  {selectedWallet.bankName} • {selectedWallet.accountNumber}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                ${selectedWallet.balance.toLocaleString()}
              </div>
              <Badge variant="secondary">{selectedWallet.type}</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Transaction Management */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transactions</CardTitle>
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="finance">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Transaction
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Transaction</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="amount">Amount</Label>
                        <Input id="amount" type="number" placeholder="0.00" />
                      </div>
                      <div>
                        <Label htmlFor="type">Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="income">Income</SelectItem>
                            <SelectItem value="expense">Expense</SelectItem>
                            <SelectItem value="transfer">Transfer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input id="category" placeholder="e.g., Groceries, Salary" />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input id="description" placeholder="Transaction description" />
                    </div>
                    <Button className="w-full">Add Transaction</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex items-center gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            {walletTransactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No transactions found
              </div>
            ) : (
              walletTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border bg-gradient-card">
                  <div className="flex items-center gap-3">
                    {getTransactionIcon(transaction.type)}
                    <div>
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-sm text-muted-foreground">
                        {transaction.category} • {transaction.date.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className={`font-semibold ${
                    transaction.amount > 0 ? 'text-success' : 'text-expense-red'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};