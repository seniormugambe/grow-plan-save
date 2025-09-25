import { DashboardHeader } from "@/components/DashboardHeader";
import { FinancialOverview } from "@/components/FinancialOverview";
import { GoalTracker } from "@/components/GoalTracker";
import { SavingsProgress } from "@/components/SavingsProgress";
import { CashflowChart } from "@/components/CashflowChart";
import { WalletDashboard } from "@/components/WalletDashboard";
import { FinancialAdvisor } from "@/components/FinancialAdvisor";
import { AIAssistantFab } from "@/components/AIAssistantFab";
import { GamificationPanel } from "@/components/GamificationPanel";
import { LevelUpNotification } from "@/components/LevelUpNotification";
import { AchievementNotification } from "@/components/AchievementNotification";
import { useGamification } from "@/hooks/useGamification";

const Index = () => {
  const { stats, showLevelUp, showAchievement } = useGamification();

  return (
    <div className="min-h-screen bg-background pattern-dots">
      <div className="container mx-auto p-6 space-y-8 animate-fade-in">
        <DashboardHeader />
        
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main content */}
          <div className="xl:col-span-2 space-y-6">
            <div className="animate-slide-up">
              <FinancialOverview />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <WalletDashboard />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CashflowChart />
            </div>
          </div>
          
          {/* Right Sidebar */}
          <div className="xl:col-span-2 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-6">
            <div className="space-y-6">
              <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <GoalTracker />
              </div>
              <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <SavingsProgress />
              </div>
              <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <GamificationPanel />
              </div>
            </div>
            
            {/* AI Financial Advisor - Hidden on smaller screens, shown as FAB */}
            <div className="hidden xl:block animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <FinancialAdvisor />
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating AI Assistant for smaller screens */}
      <div className="xl:hidden">
        <AIAssistantFab />
      </div>

      {/* Gamification Notifications */}
      <LevelUpNotification
        show={showLevelUp}
        level={stats.level.level}
        title={stats.level.title}
        onClose={() => {}}
      />
      
      <AchievementNotification
        achievement={showAchievement}
        onClose={() => {}}
      />
    </div>
  );
};

export default Index;