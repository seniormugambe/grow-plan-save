import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";

const financialData = [
  {
    title: "Total Balance",
    amount: "$12,450.00",
    change: "+$1,200.00",
    trend: "up",
    icon: DollarSign,
    color: "text-primary"
  },
  {
    title: "Monthly Savings",
    amount: "$2,850.00",
    change: "+15.3%",
    trend: "up", 
    icon: TrendingUp,
    color: "text-success"
  },
  {
    title: "Monthly Expenses",
    amount: "$3,420.00",
    change: "-5.2%",
    trend: "down",
    icon: TrendingDown,
    color: "text-expense-red"
  },
  {
    title: "Goals Progress",
    amount: "73%",
    change: "+8.5%",
    trend: "up",
    icon: Target,
    color: "text-accent"
  }
];

export const FinancialOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {financialData.map((item, index) => {
        const Icon = item.icon;
        const TrendIcon = item.trend === "up" ? TrendingUp : TrendingDown;
        
        return (
          <Card key={index} className="bg-gradient-card shadow-card hover:shadow-finance transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.amount}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <TrendIcon className={`h-3 w-3 mr-1 ${
                  item.trend === "up" ? "text-success" : "text-expense-red"
                }`} />
                <span className={item.trend === "up" ? "text-success" : "text-expense-red"}>
                  {item.change}
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};