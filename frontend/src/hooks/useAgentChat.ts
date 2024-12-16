import { useState } from "react"

export interface Message {
  id: string
  content: string
  sender: {
    id: string
    name: string
    type: "user" | "agent"
  }
  timestamp: string
}

export interface Conversation {
  id: string
  messages: Message[]
  participants: {
    id: string
    name: string
    type: "user" | "agent"
  }[]
}

interface SendMessageParams {
  conversationId: string
  message: Omit<Message, "id">
}

export function useAgentChat(scenarioId: string) {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "default",
      messages: [],
      participants: [
        {
          id: "user1",
          name: "User",
          type: "user",
        },
        {
          id: "agent1",
          name: "Assistant",
          type: "agent",
        },
      ],
    },
  ])
  const [isSending, setIsSending] = useState(false)

  const sendMessage = async ({ conversationId, message }: SendMessageParams) => {
    setIsSending(true)
    try {
      // Generate a unique ID for the message
      const newMessage = {
        ...message,
        id: Math.random().toString(36).substr(2, 9),
      }

      // Update the conversation with the new message
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === conversationId
            ? {
                ...conv,
                messages: [...conv.messages, newMessage],
              }
            : conv
        )
      )

      // Simulate agent response
      setTimeout(() => {
        const agentResponse: Message = {
          id: Math.random().toString(36).substr(2, 9),
          content: "This is a simulated agent response. The actual implementation will connect to your backend API.",
          sender: {
            id: "agent1",
            name: "Assistant",
            type: "agent",
          },
          timestamp: new Date().toISOString(),
        }

        setConversations((prevConversations) =>
          prevConversations.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: [...conv.messages, agentResponse],
                }
              : conv
          )
        )
        setIsSending(false)
      }, 1000)
    } catch (error) {
      console.error("Error sending message:", error)
      setIsSending(false)
    }
  }

  return {
    conversations,
    sendMessage,
    isSending,
  }
} 