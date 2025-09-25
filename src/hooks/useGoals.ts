import { useState, useCallback } from 'react';
import { FinancialGoal, GoalProgress, GoalSummary } from '@/types/goal';
import { mockGoals } from '@/data/goals';

export const useGoals = () => {
  const [goals, setGoals] = useState<FinancialGoal[]>(mockGoals);
  const [goalProgress, setGoalProgress] = useState<GoalProgress[]>([]);

  const getGoalById = useCallback((id: string) => {
    return goals.find(goal => goal.id === id);
  }, [goals]);

  const getActiveGoals = useCallback(() => {
    return goals.filter(goal => goal.isActive);
  }, [goals]);

  const getGoalSummary = useCallback((): GoalSummary => {
    const activeGoals = getActiveGoals();
    const completedGoals = goals.filter(goal => goal.currentAmount >= goal.targetAmount);
    
    const totalTargetAmount = activeGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
    const totalCurrentAmount = activeGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
    const overallProgress = totalTargetAmount > 0 ? (totalCurrentAmount / totalTargetAmount) * 100 : 0;
    const monthlyTarget = activeGoals.reduce((sum, goal) => sum + (goal.monthlyContribution || 0), 0);

    return {
      totalGoals: goals.length,
      activeGoals: activeGoals.length,
      completedGoals: completedGoals.length,
      totalTargetAmount,
      totalCurrentAmount,
      overallProgress,
      monthlyTarget
    };
  }, [goals, getActiveGoals]);

  const addGoal = useCallback((goalData: Omit<FinancialGoal, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newGoal: FinancialGoal = {
      ...goalData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setGoals(prev => [...prev, newGoal]);
    return newGoal;
  }, []);

  const updateGoal = useCallback((id: string, updates: Partial<FinancialGoal>) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id 
        ? { ...goal, ...updates, updatedAt: new Date() }
        : goal
    ));
  }, []);

  const deleteGoal = useCallback((id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
    setGoalProgress(prev => prev.filter(progress => progress.goalId !== id));
  }, []);

  const addProgress = useCallback((progress: Omit<GoalProgress, 'date'>) => {
    const newProgress: GoalProgress = {
      ...progress,
      date: new Date()
    };
    
    setGoalProgress(prev => [...prev, newProgress]);
    
    // Update goal current amount
    setGoals(prev => prev.map(goal => {
      if (goal.id === progress.goalId) {
        const newAmount = progress.type === 'withdrawal' 
          ? Math.max(0, goal.currentAmount - progress.amount)
          : goal.currentAmount + progress.amount;
        
        return {
          ...goal,
          currentAmount: newAmount,
          updatedAt: new Date()
        };
      }
      return goal;
    }));

    return newProgress;
  }, []);

  const getGoalProgress = useCallback((goalId: string) => {
    return goalProgress.filter(progress => progress.goalId === goalId);
  }, [goalProgress]);

  const calculateMonthsToGoal = useCallback((goal: FinancialGoal) => {
    if (!goal.monthlyContribution || goal.monthlyContribution <= 0) return null;
    
    const remaining = goal.targetAmount - goal.currentAmount;
    if (remaining <= 0) return 0;
    
    return Math.ceil(remaining / goal.monthlyContribution);
  }, []);

  const getGoalsByCategory = useCallback((category: FinancialGoal['category']) => {
    return goals.filter(goal => goal.category === category && goal.isActive);
  }, [goals]);

  return {
    goals,
    goalProgress,
    getGoalById,
    getActiveGoals,
    getGoalSummary,
    addGoal,
    updateGoal,
    deleteGoal,
    addProgress,
    getGoalProgress,
    calculateMonthsToGoal,
    getGoalsByCategory
  };
};