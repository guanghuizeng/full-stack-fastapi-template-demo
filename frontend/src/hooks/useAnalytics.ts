import { useState, useEffect } from "react"
import type { MetricData, ResourceData, InsightData } from "../types"

export function useAnalytics() {
  const [metrics, setMetrics] = useState<MetricData>()
  const [resources, setResources] = useState<ResourceData>()
  const [insights, setInsights] = useState<InsightData>()
  const [isLoading, setIsLoading] = useState(true)

  const fetchMetrics = async (): Promise<MetricData> => {
    // Simulated API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalSimulations: 150,
          activeAgents: 25,
          avgDuration: 45,
          successRate: 85,
        })
      }, 1000)
    })
  }

  const fetchResources = async (): Promise<ResourceData> => {
    // Simulated API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          cpuUsage: 65,
          memoryUsage: 45,
        })
      }, 1000)
    })
  }

  const fetchInsights = async (): Promise<InsightData> => {
    // Simulated API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          agentPerformance: 78,
          tasksCompleted: 245,
          scenarioSuccessRates: 82,
        })
      }, 1000)
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [metricsData, resourcesData, insightsData] = await Promise.all([
          fetchMetrics(),
          fetchResources(),
          fetchInsights(),
        ])
        setMetrics(metricsData)
        setResources(resourcesData)
        setInsights(insightsData)
      } catch (error) {
        console.error("Error fetching analytics data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return {
    metrics,
    resources,
    insights,
    isLoading,
  }
}

export default useAnalytics 