import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PiggyBank, TrendingUp } from "lucide-react";

const savingsData = {
  monthlyTarget: 3000,
  currentMonth: 2850,
  yearlyTarget: 36000,
  yearToDate: 28500,
  monthsLeft: 4
};

export const SavingsProgress = () => {
  const monthlyProgress = (savingsData.currentMonth / savingsData.monthlyTarget) * 100;
  const yearlyProgress = (savingsData.yearToDate / savingsData.yearlyTarget) * 100;
  
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PiggyBank className="w-5 h-5 text-success" />
          Savings Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Monthly Progress */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-sm">This Month</h4>
            <div className="text-right">
              <div className="font-semibold text-success">
                ${savingsData.currentMonth.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                of ${savingsData.monthlyTarget.toLocaleString()}
              </div>
            </div>
          </div>
          <Progress value={monthlyProgress} className="h-3" />
          <div className="text-xs text-muted-foreground text-center">
            {Math.round(monthlyProgress)}% of monthly goal achieved
          </div>
        </div>

        {/* Yearly Progress */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-sm">This Year</h4>
            <div className="text-right">
              <div className="font-semibold text-primary">
                ${savingsData.yearToDate.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                of ${savingsData.yearlyTarget.toLocaleString()}
              </div>
            </div>
          </div>
          <Progress value={yearlyProgress} className="h-3" />
          <div className="text-xs text-muted-foreground text-center">
            {Math.round(yearlyProgress)}% of yearly goal achieved
          </div>
        </div>

        {/* Projection */}
        <div className="bg-gradient-success/10 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="font-semibold text-sm">Projection</span>
          </div>
          <p className="text-xs text-muted-foreground">
            At your current rate, you'll save <span className="font-semibold text-success">
            ${Math.round((savingsData.yearToDate / 8) * 12).toLocaleString()}
            </span> this year. You're on track to exceed your goal!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};