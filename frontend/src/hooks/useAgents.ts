import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { FiUser, FiUsers, FiCpu } from "react-icons/fi"

// Types
export interface Agent {
  id: string
  name: string
  type: "persona" | "service" | "analyst"
  icon: any
  description: string
  status: "active" | "ready" | "training"
  traits: string[]
  experience: "beginner" | "intermediate" | "advanced" | "expert"
}

// Mock API functions - Replace these with actual API calls
const fetchAgents = async (): Promise<Agent[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    {
      id: "1",
      name: "Customer Persona",
      type: "persona",
      icon: FiUser,
      description: "Simulates typical customer behavior and preferences",
      status: "active",
      traits: ["analytical", "detail-oriented"],
      experience: "advanced",
    },
    {
      id: "2",
      name: "Support Agent",
      type: "service",
      icon: FiUsers,
      description: "Handles customer support interactions",
      status: "ready",
      traits: ["helpful", "patient"],
      experience: "intermediate",
    },
    {
      id: "3",
      name: "Market Analyst",
      type: "analyst",
      icon: FiCpu,
      description: "Analyzes market trends and consumer behavior",
      status: "training",
      traits: ["strategic", "data-driven"],
      experience: "expert",
    },
  ]
}

const createAgent = async (agent: Omit<Agent, "id">): Promise<Agent> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    ...agent,
    id: Math.random().toString(36).substr(2, 9),
  }
}

const updateAgent = async (agent: Agent): Promise<Agent> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return agent
}

const deleteAgent = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
}

// Hook
export function useAgents(filter?: string) {
  const queryClient = useQueryClient()

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["agents", filter],
    queryFn: fetchAgents,
    select: data => {
      if (!filter || filter === "all") return data
      return data.filter(agent => agent.status === filter.toLowerCase())
    },
  })

  const createMutation = useMutation({
    mutationFn: createAgent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agents"] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateAgent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agents"] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteAgent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agents"] })
    },
  })

  return {
    agents,
    isLoading,
    createAgent: createMutation.mutate,
    updateAgent: updateMutation.mutate,
    deleteAgent: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
} 