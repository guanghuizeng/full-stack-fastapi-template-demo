export default {
  common: {
    dashboard: "Dashboard",
    simulation: "Simulation",
    settings: "User Settings",
    admin: "Admin",
    create: "Create",
    edit: "Edit",
    delete: "Delete",
    cancel: "Cancel",
    confirm: "Confirm",
    loading: "Loading...",
    success: "Operation Successful",
    error: "Operation Failed",
    filter: "Filter",
    all: "All",
    view: "View Details",
    update: "Update",
    name: "Name",
    description: "Description",
    start: "Start",
    stop: "Stop",
  },
  simulation: {
    title: "AI Simulation",
    scenarios: {
      title: "Scenarios",
      templates: "Templates",
      activeScenarios: "Active Scenarios",
      createScenario: "Create Scenario",
      createFromTemplate: "Create from {{name}} Template",
      createSuccess: "Scenario created successfully",
      createError: "Failed to create scenario. Please try again",
      name: "Name",
      namePlaceholder: "Enter scenario name",
      type: "Type",
      description: "Description",
      descriptionPlaceholder: "Enter scenario description",
      status: "Status",
      progress: "Progress",
      successRate: "Success Rate",
      tasks: "Tasks",
      objectives: "Objectives",
      requiredAgents: "Required Agents",
      types: {
        chat: "Chat",
        task: "Task",
        decision: "Decision",
        collaboration: "Collaboration",
        all: "All Types"
      },
      status: {
        active: "Active",
        completed: "Completed",
        failed: "Failed",
        draft: "Draft"
      }
    },
    agents: {
      title: "Agents",
      createAgent: "Create Agent",
      editAgent: "Edit Agent",
      name: "Name",
      namePlaceholder: "Enter agent name",
      type: "Type",
      description: "Description",
      descriptionPlaceholder: "Enter agent description",
      status: "Status",
      experience: "Experience Level",
      traits: "Traits",
      traitsPlaceholder: "Enter agent traits, separated by commas",
      train: "Train",
      deploy: "Deploy",
      types: {
        persona: "Persona",
        service: "Service",
        analyst: "Analyst"
      },
      status: {
        active: "Active",
        ready: "Ready",
        training: "Training",
        all: "All Statuses"
      },
      experienceLevels: {
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
        expert: "Expert"
      }
    },
    worlds: {
      title: "Worlds",
      createWorld: "Create World",
      configureWorld: "Configure World",
      configure: "Configure",
      status: "Status",
      complexity: "Complexity",
      agentCount: "Agent Count",
      resourceUsage: "Resource Usage",
      maxAgents: "Max Agents",
      timeScale: "Time Scale",
      environment: "Environment",
      constraints: "Constraints",
      namePlaceholder: "Enter world name",
      descriptionPlaceholder: "Enter world description",
      environmentPlaceholder: "Enter environment name",
      constraintsPlaceholder: "Enter constraints, separated by commas",
      complexityLevels: {
        low: "Low",
        medium: "Medium",
        high: "High"
      },
      status: {
        active: "Active",
        standby: "Standby",
        configuring: "Configuring",
        all: "All Statuses"
      }
    },
    analysis: {
      title: "Analysis",
      metrics: {
        title: "Performance Metrics",
        totalSimulations: "Total Simulations",
        activeAgents: "Active Agents",
        avgDuration: "Average Duration",
        successRate: "Success Rate",
        last30Days: "Last 30 days",
        currentlyRunning: "Currently running",
        perSimulation: "Per simulation",
        completedSimulations: "Completed simulations",
        activityTimeline: "Activity Timeline",
        activityLevel: "Activity Level"
      },
      resources: {
        title: "Resources",
        cpuUsage: "CPU Usage",
        memoryUsage: "Memory Usage",
        cpuUsagePercent: "CPU Usage (%)",
        memoryUsagePercent: "Memory Usage (%)"
      },
      insights: {
        title: "Insights",
        agentPerformance: "Agent Performance",
        performanceScore: "Performance Score",
        tasksCompleted: "Tasks Completed",
        scenarioSuccessRates: "Scenario Success Rates"
      },
      timeRange: {
        "24h": "Last 24 Hours",
        "7d": "Last 7 Days",
        "30d": "Last 30 Days",
        custom: "Custom Range"
      }
    }
  }
} 