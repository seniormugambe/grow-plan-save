import { useState, useCallback } from 'react';
import { GamificationStats, Achievement, Challenge, Streak } from '@/types/gamification';
import { mockGamificationStats } from '@/data/gamification';

export const useGamification = () => {
  const [stats, setStats] = useState<GamificationStats>(mockGamificationStats);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);

  const addXP = useCallback((amount: number, reason?: string) => {
    setStats(prev => {
      const newTotalXP = prev.totalXP + amount;
      const newCurrentXP = prev.level.currentXP + amount;
      
      // Check for level up
      let newLevel = prev.level;
      if (newCurrentXP >= prev.level.xpToNext) {
        const levelUpXP = newCurrentXP - prev.level.xpToNext;
        newLevel = {
          ...prev.level,
          level: prev.level.level + 1,
          currentXP: levelUpXP,
          xpToNext: Math.floor(prev.level.xpToNext * 1.2), // Increase XP requirement
          totalXP: newTotalXP,
          title: getLevelTitle(prev.level.level + 1)
        };
        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 5000);
      } else {
        newLevel = {
          ...prev.level,
          currentXP: newCurrentXP,
          totalXP: newTotalXP
        };
      }

      return {
        ...prev,
        totalXP: newTotalXP,
        level: newLevel,
        weeklyXP: prev.weeklyXP + amount,
        monthlyXP: prev.monthlyXP + amount
      };
    });
  }, []);

  const unlockAchievement = useCallback((achievementId: string) => {
    setStats(prev => {
      const achievement = prev.achievements.find(a => a.id === achievementId);
      if (!achievement || achievement.unlocked) return prev;

      const updatedAchievement = {
        ...achievement,
        unlocked: true,
        unlockedAt: new Date()
      };

      setShowAchievement(updatedAchievement);
      setTimeout(() => setShowAchievement(null), 5000);

      // Add XP for achievement
      addXP(achievement.points, `Achievement: ${achievement.title}`);

      return {
        ...prev,
        achievements: prev.achievements.map(a => 
          a.id === achievementId ? updatedAchievement : a
        )
      };
    });
  }, [addXP]);

  const updateStreaks = useCallback((streakId: string, increment: boolean = true) => {
    setStats(prev => ({
      ...prev,
      streaks: prev.streaks.map(streak => {
        if (streak.id === streakId) {
          const newStreak = increment ? streak.currentStreak + 1 : 0;
          const newBest = Math.max(streak.bestStreak, newStreak);
          
          if (increment) {
            addXP(streak.xpPerDay, `Streak: ${streak.name}`);
          }

          return {
            ...streak,
            currentStreak: newStreak,
            bestStreak: newBest,
            lastActivity: new Date(),
            isActive: increment
          };
        }
        return streak;
      })
    }));
  }, [addXP]);

  const completeChallenge = useCallback((challengeId: string) => {
    setStats(prev => {
      const challenge = prev.challenges.find(c => c.id === challengeId);
      if (!challenge || challenge.isCompleted) return prev;

      addXP(challenge.reward.xp, `Challenge: ${challenge.title}`);

      return {
        ...prev,
        challenges: prev.challenges.map(c =>
          c.id === challengeId 
            ? { ...c, isCompleted: true, progress: c.maxProgress }
            : c
        )
      };
    });
  }, [addXP]);

  const updateChallengeProgress = useCallback((challengeId: string, progress: number) => {
    setStats(prev => ({
      ...prev,
      challenges: prev.challenges.map(c => {
        if (c.id === challengeId) {
          const newProgress = Math.min(progress, c.maxProgress);
          const isCompleted = newProgress >= c.maxProgress;
          
          if (isCompleted && !c.isCompleted) {
            completeChallenge(challengeId);
          }
          
          return {
            ...c,
            progress: newProgress,
            isCompleted
          };
        }
        return c;
      })
    }));
  }, [completeChallenge]);

  const getLevelTitle = (level: number): string => {
    if (level < 5) return 'Financial Novice';
    if (level < 10) return 'Budget Apprentice';
    if (level < 15) return 'Savings Specialist';
    if (level < 20) return 'Investment Strategist';
    if (level < 25) return 'Financial Advisor';
    if (level < 30) return 'Wealth Builder';
    return 'Financial Master';
  };

  const getProgressToNextLevel = () => {
    return (stats.level.currentXP / stats.level.xpToNext) * 100;
  };

  const getActiveStreaks = () => {
    return stats.streaks.filter(s => s.isActive);
  };

  const getActiveChallenges = () => {
    return stats.challenges.filter(c => c.isActive && !c.isCompleted);
  };

  const getRecentAchievements = () => {
    return stats.achievements
      .filter(a => a.unlocked)
      .sort((a, b) => (b.unlockedAt?.getTime() || 0) - (a.unlockedAt?.getTime() || 0))
      .slice(0, 3);
  };

  return {
    stats,
    showLevelUp,
    showAchievement,
    addXP,
    unlockAchievement,
    updateStreaks,
    completeChallenge,
    updateChallengeProgress,
    getProgressToNextLevel,
    getActiveStreaks,
    getActiveChallenges,
    getRecentAchievements
  };
};