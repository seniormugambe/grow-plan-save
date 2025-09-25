import { useState, useCallback } from "react";

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  category?: 'budgeting' | 'saving' | 'investing' | 'debt' | 'general';
}

export const useFinancialChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      content: "Hey there! 👋 I'm Finley, your AI financial advisor powered by Google Gemini! 🤖✨ I've analyzed your financial situation and I'm genuinely excited to help you succeed with money! 🌟\n\nI can see you're already making smart moves - your savings rate is impressive! Whether you want to chat about budgeting, investing, or planning for the future, I'm here with personalized advice just for you. What would you like to explore today? 💰💭",
      isUser: false,
      timestamp: new Date(),
      category: 'general'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: content.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Dynamic import to avoid bundling issues
      const { geminiAdvisor } = await import("@/services/geminiAiService");
      
      // Show realistic thinking time for AI
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
      
      const response = await geminiAdvisor.getAdvice(content);
      
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        content: response.content,
        isUser: false,
        timestamp: new Date(),
        category: response.category
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        content: "Oops! 😅 I'm having a tiny technical hiccup right now. Give me just a moment to get back on track! In the meantime, feel free to ask me about budgeting, saving, investing, or any other money questions - I love talking about finances! 💰✨",
        isUser: false,
        timestamp: new Date(),
        category: 'general'
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([messages[0]]); // Keep welcome message
  }, [messages]);

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat
  };
};