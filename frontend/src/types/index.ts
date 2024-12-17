export interface Agent {
  id: string;
  name: string;
  type: 'persona' | 'service' | 'analyst';
  description: string;
  status: 'active' | 'ready' | 'training';
  traits: string[];
  experience: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface World {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'standby' | 'configuring';
  complexity: 'low' | 'medium' | 'high';
  agentCount: number;
  resourceUsage: number;
  icon?: React.ComponentType;
  settings: {
    maxAgents: number;
    timeScale: number;
    environment: string;
    constraints: string[];
  };
}

export interface MetricData {
  totalSimulations: number;
  activeAgents: number;
  avgDuration: number;
  successRate: number;
}

export interface ResourceData {
  cpuUsage: number;
  memoryUsage: number;
}

export interface InsightData {
  agentPerformance: number;
  tasksCompleted: number;
  scenarioSuccessRates: number;
} 