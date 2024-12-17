import { useState, useCallback } from "react"

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

export interface Participant {
  id: string;
  name: string;
  type: "user" | "agent";
}

export interface Conversation {
  id: string;
  messages: Message[];
  participants: Participant[];
}

export function useAgentChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    setIsLoading(true);
    try {
      // Generate a unique ID for the message
      const newMessage: Message = {
        id: Math.random().toString(36).substring(2, 9),
        content,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);

      // Simulate agent response
      setTimeout(() => {
        const agentResponse: Message = {
          id: Math.random().toString(36).substring(2, 9),
          content: "This is a simulated agent response. The actual implementation will connect to your backend API.",
          sender: 'agent',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, agentResponse]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to send message:', error);
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
  };
}

export default useAgentChat; 