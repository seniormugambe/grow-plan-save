import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp } from "lucide-react";

const cashflowData = [
  { month: 'Jan', income: 5500, expenses: 3200, savings: 2300 },
  { month: 'Feb', income: 5500, expenses: 3400, savings: 2100 },
  { month: 'Mar', income: 5800, expenses: 3100, savings: 2700 },
  { month: 'Apr', income: 5500, expenses: 3600, savings: 1900 },
  { month: 'May', income: 6000, expenses: 3300, savings: 2700 },
  { month: 'Jun', income: 5500, expenses: 3200, savings: 2300 },
  { month: 'Jul', income: 5500, expenses: 3100, savings: 2400 },
  { month: 'Aug', income: 5800, expenses: 3050, savings: 2750 },
];

export const CashflowChart = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Cashflow Trend */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Cashflow Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={cashflowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Income"
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="hsl(var(--expense-red))" 
                strokeWidth={2}
                name="Expenses"
              />
              <Line 
                type="monotone" 
                dataKey="savings" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                name="Savings"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Breakdown */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Monthly Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={cashflowData.slice(-6)}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="income" fill="hsl(var(--primary))" name="Income" />
              <Bar dataKey="expenses" fill="hsl(var(--expense-red))" name="Expenses" />
              <Bar dataKey="savings" fill="hsl(var(--success))" name="Savings" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};