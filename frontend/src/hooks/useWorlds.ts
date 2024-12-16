import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { FiGlobe, FiShoppingBag, FiMessageSquare } from "react-icons/fi"

// Types
export interface World {
  id: string
  name: string
  icon: any
  description: string
  status: "active" | "standby" | "configuring"
  complexity: "low" | "medium" | "high"
  agentCount: number
  resourceUsage: number
  settings?: {
    maxAgents: number
    timeScale: number
    environment: string
    constraints: string[]
  }
}

// Mock API functions - Replace these with actual API calls
const fetchWorlds = async (): Promise<World[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    {
      id: "1",
      name: "E-commerce Marketplace",
      icon: FiShoppingBag,
      description: "Virtual marketplace environment for testing customer behaviors",
      status: "active",
      complexity: "high",
      agentCount: 12,
      resourceUsage: 75,
      settings: {
        maxAgents: 20,
        timeScale: 1.5,
        environment: "marketplace",
        constraints: ["budget", "inventory"],
      },
    },
    {
      id: "2",
      name: "Support Chat",
      icon: FiMessageSquare,
      description: "Customer service environment for testing support scenarios",
      status: "standby",
      complexity: "medium",
      agentCount: 5,
      resourceUsage: 30,
      settings: {
        maxAgents: 10,
        timeScale: 1.0,
        environment: "chat",
        constraints: ["response_time", "satisfaction"],
      },
    },
    {
      id: "3",
      name: "Global Market",
      icon: FiGlobe,
      description: "International market simulation for testing regional behaviors",
      status: "configuring",
      complexity: "high",
      agentCount: 20,
      resourceUsage: 0,
      settings: {
        maxAgents: 50,
        timeScale: 2.0,
        environment: "global",
        constraints: ["timezone", "currency", "language"],
      },
    },
  ]
}

const createWorld = async (world: Omit<World, "id">): Promise<World> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    ...world,
    id: Math.random().toString(36).substr(2, 9),
  }
}

const updateWorld = async (world: World): Promise<World> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return world
}

const deleteWorld = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
}

const startWorld = async (id: string): Promise<World> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    ...(await fetchWorlds()).find(w => w.id === id)!,
    status: "active",
  }
}

const stopWorld = async (id: string): Promise<World> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    ...(await fetchWorlds()).find(w => w.id === id)!,
    status: "standby",
  }
}

// Hook
export function useWorlds(filter?: string) {
  const queryClient = useQueryClient()

  const { data: worlds = [], isLoading } = useQuery({
    queryKey: ["worlds", filter],
    queryFn: fetchWorlds,
    select: data => {
      if (!filter || filter === "all") return data
      return data.filter(world => world.status === filter.toLowerCase())
    },
  })

  const createMutation = useMutation({
    mutationFn: createWorld,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["worlds"] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateWorld,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["worlds"] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteWorld,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["worlds"] })
    },
  })

  const startMutation = useMutation({
    mutationFn: startWorld,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["worlds"] })
    },
  })

  const stopMutation = useMutation({
    mutationFn: stopWorld,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["worlds"] })
    },
  })

  return {
    worlds,
    isLoading,
    createWorld: createMutation.mutate,
    updateWorld: updateMutation.mutate,
    deleteWorld: deleteMutation.mutate,
    startWorld: startMutation.mutate,
    stopWorld: stopMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isStarting: startMutation.isPending,
    isStopping: stopMutation.isPending,
  }
} 