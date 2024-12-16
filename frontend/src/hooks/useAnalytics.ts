import { useQuery } from "@tanstack/react-query"

// Types
export interface MetricData {
  totalSimulations: number
  activeAgents: number
  avgDuration: string
  successRate: string
  recentActivity: Array<{
    time: string
    value: number
  }>
}

export interface ResourceData {
  cpu: Array<{
    time: string
    usage: number
  }>
  memory: Array<{
    time: string
    usage: number
  }>
}

export interface InsightData {
  agentPerformance: Array<{
    agent: string
    score: number
    tasks: number
  }>
  scenarioSuccess: Array<{
    scenario: string
    success: number
    total: number
  }>
}

// Mock API functions - Replace these with actual API calls
const fetchMetrics = async (timeRange: string): Promise<MetricData> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    totalSimulations: 156,
    activeAgents: 45,
    avgDuration: "2.5h",
    successRate: "87%",
    recentActivity: [
      { time: "10:00", value: 65 },
      { time: "11:00", value: 75 },
      { time: "12:00", value: 85 },
      { time: "13:00", value: 70 },
      { time: "14:00", value: 90 },
    ],
  }
}

const fetchResources = async (timeRange: string): Promise<ResourceData> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    cpu: [
      { time: "10:00", usage: 45 },
      { time: "11:00", usage: 55 },
      { time: "12:00", usage: 65 },
      { time: "13:00", usage: 60 },
      { time: "14:00", usage: 70 },
    ],
    memory: [
      { time: "10:00", usage: 30 },
      { time: "11:00", usage: 35 },
      { time: "12:00", usage: 40 },
      { time: "13:00", usage: 38 },
      { time: "14:00", usage: 45 },
    ],
  }
}

const fetchInsights = async (timeRange: string): Promise<InsightData> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    agentPerformance: [
      { agent: "Customer Persona", score: 85, tasks: 120 },
      { agent: "Support Agent", score: 92, tasks: 200 },
      { agent: "Market Analyst", score: 78, tasks: 80 },
    ],
    scenarioSuccess: [
      { scenario: "Customer Interview", success: 45, total: 50 },
      { scenario: "Product Testing", success: 28, total: 35 },
      { scenario: "Focus Group", success: 18, total: 20 },
    ],
  }
}

// Hook
export function useAnalytics(timeRange: string = "24h") {
  const { data: metrics, isLoading: isLoadingMetrics } = useQuery({
    queryKey: ["metrics", timeRange],
    queryFn: () => fetchMetrics(timeRange),
  })

  const { data: resources, isLoading: isLoadingResources } = useQuery({
    queryKey: ["resources", timeRange],
    queryFn: () => fetchResources(timeRange),
  })

  const { data: insights, isLoading: isLoadingInsights } = useQuery({
    queryKey: ["insights", timeRange],
    queryFn: () => fetchInsights(timeRange),
  })

  return {
    metrics,
    resources,
    insights,
    isLoading: isLoadingMetrics || isLoadingResources || isLoadingInsights,
  }
} 