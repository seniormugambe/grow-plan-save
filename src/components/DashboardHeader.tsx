import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings } from "lucide-react";

export const DashboardHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Finance Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Track your savings, goals, and spending in one place
        </p>
      </div>
      
      <div className="flex gap-3">
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
        <Button size="sm" variant="finance" className="shadow-finance">
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Goal
        </Button>
      </div>
    </div>
  );
};