import { useState, useCallback } from "react"

export interface Message {
  id: string;
  content: string;
  type: 'text' | 'code' | 'image';
  language?: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    isAgent?: boolean;
  };
  timestamp: string;
  status?: 'sending' | 'sent' | 'error' | 'read';
  replyTo?: Message;
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
        type: 'text',
        sender: {
          id: 'user-1',
          name: 'User',
          isAgent: false
        },
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, newMessage]);

      // Simulate agent response
      setTimeout(() => {
        const agentResponse: Message = {
          id: Math.random().toString(36).substring(2, 9),
          content: "This is a simulated agent response. The actual implementation will connect to your backend API.",
          type: 'text',
          sender: {
            id: 'agent-1',
            name: 'AI Assistant',
            isAgent: true
          },
          timestamp: new Date().toISOString()
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