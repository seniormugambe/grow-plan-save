import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Target, ShoppingCart } from "lucide-react";

const goals = [
  {
    id: 1,
    title: "Emergency Fund",
    category: "Short-term",
    current: 4500,
    target: 6000,
    deadline: "3 months",
    icon: Target,
    color: "bg-accent"
  },
  {
    id: 2,
    title: "Vacation to Europe",
    category: "Planned Purchase",
    current: 2800,
    target: 5000,
    deadline: "8 months",
    icon: ShoppingCart,
    color: "bg-primary"
  },
  {
    id: 3,
    title: "Retirement Savings",
    category: "Recurring",
    current: 15000,
    target: 20000,
    deadline: "12 months",
    icon: CalendarDays,
    color: "bg-success"
  }
];

export const GoalTracker = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Financial Goals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          const Icon = goal.icon;
          
          return (
            <div key={goal.id} className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${goal.color}/10`}>
                    <Icon className={`w-4 h-4 ${goal.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{goal.title}</h4>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {goal.category}
                    </Badge>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div className="font-semibold">${goal.current.toLocaleString()}</div>
                  <div className="text-muted-foreground">of ${goal.target.toLocaleString()}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{Math.round(progress)}% complete</span>
                  <span>{goal.deadline} left</span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};