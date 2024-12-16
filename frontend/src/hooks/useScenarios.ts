import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Agent } from "./useAgents"
import { World } from "./useWorlds"

export type ScenarioType = "chat" | "task" | "decision" | "collaboration"
export type ScenarioStatus = "draft" | "ready" | "active" | "completed" | "archived"

export interface ScenarioTemplate {
  id: string
  name: string
  type: ScenarioType
  description: string
  objectives: string[]
  requiredAgents: {
    role: string
    type: Agent["type"]
    count: number
  }[]
  settings: {
    duration?: number
    environment?: string
    constraints?: string[]
    successCriteria?: string[]
  }
}

export interface ScenarioInstance {
  id: string
  templateId: string
  name: string
  type: ScenarioType
  status: ScenarioStatus
  description: string
  startTime?: string
  endTime?: string
  participants: {
    agentId: string
    role: string
  }[]
  worldId?: string
  metrics?: {
    progress: number
    successRate: number
    completedTasks: number
    duration: number
  }
  results?: {
    objectives: {
      id: string
      description: string
      status: "completed" | "failed" | "pending"
    }[]
    artifacts: {
      id: string
      type: string
      url: string
      description: string
    }[]
  }
}

// Mock API functions
const fetchTemplates = async (): Promise<ScenarioTemplate[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    {
      id: "template1",
      name: "Customer Support Chat",
      type: "chat",
      description: "Simulate customer support interactions",
      objectives: [
        "Handle customer inquiries effectively",
        "Resolve issues within time limit",
        "Maintain high customer satisfaction",
      ],
      requiredAgents: [
        {
          role: "support",
          type: "service",
          count: 1,
        },
        {
          role: "customer",
          type: "persona",
          count: 1,
        },
      ],
      settings: {
        duration: 30,
        environment: "chat",
        constraints: ["response_time < 1min", "satisfaction > 80%"],
        successCriteria: ["issue_resolved", "satisfaction_achieved"],
      },
    },
    {
      id: "template2",
      name: "Market Analysis Task",
      type: "task",
      description: "Analyze market trends and competitor data",
      objectives: [
        "Collect market data",
        "Analyze trends",
        "Generate insights report",
      ],
      requiredAgents: [
        {
          role: "analyst",
          type: "analyst",
          count: 2,
        },
      ],
      settings: {
        duration: 120,
        environment: "data_analysis",
        constraints: ["data_accuracy > 95%"],
        successCriteria: ["report_generated", "insights_validated"],
      },
    },
  ]
}

const fetchInstances = async (): Promise<ScenarioInstance[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [
    {
      id: "instance1",
      templateId: "template1",
      name: "Support Chat #123",
      type: "chat",
      status: "active",
      description: "Active customer support session",
      startTime: new Date().toISOString(),
      participants: [
        {
          agentId: "agent1",
          role: "support",
        },
        {
          agentId: "agent2",
          role: "customer",
        },
      ],
      worldId: "world1",
      metrics: {
        progress: 60,
        successRate: 85,
        completedTasks: 3,
        duration: 15,
      },
    },
  ]
}

const createInstance = async (
  templateId: string,
  data: Partial<ScenarioInstance>
): Promise<ScenarioInstance> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    id: Math.random().toString(36).substr(2, 9),
    templateId,
    status: "active",
    ...data,
  } as ScenarioInstance
}

const updateInstance = async (
  instance: ScenarioInstance
): Promise<ScenarioInstance> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return instance
}

export function useScenarios() {
  const queryClient = useQueryClient()

  const { data: templates = [], isLoading: isLoadingTemplates } = useQuery({
    queryKey: ["scenarioTemplates"],
    queryFn: fetchTemplates,
  })

  const { data: instances = [], isLoading: isLoadingInstances } = useQuery({
    queryKey: ["scenarioInstances"],
    queryFn: fetchInstances,
  })

  const createInstanceMutation = useMutation({
    mutationFn: ({ templateId, data }: { templateId: string; data: Partial<ScenarioInstance> }) =>
      createInstance(templateId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scenarioInstances"] })
    },
  })

  const updateInstanceMutation = useMutation({
    mutationFn: updateInstance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scenarioInstances"] })
    },
  })

  return {
    templates,
    instances,
    isLoading: isLoadingTemplates || isLoadingInstances,
    createInstance: createInstanceMutation.mutate,
    updateInstance: updateInstanceMutation.mutate,
    isCreating: createInstanceMutation.isPending,
    isUpdating: updateInstanceMutation.isPending,
  }
} 