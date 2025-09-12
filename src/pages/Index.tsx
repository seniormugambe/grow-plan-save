import { DashboardHeader } from "@/components/DashboardHeader";
import { FinancialOverview } from "@/components/FinancialOverview";
import { GoalTracker } from "@/components/GoalTracker";
import { SavingsProgress } from "@/components/SavingsProgress";
import { CashflowChart } from "@/components/CashflowChart";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        <DashboardHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <FinancialOverview />
            <CashflowChart />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <GoalTracker />
            <SavingsProgress />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;