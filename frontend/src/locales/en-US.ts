export default {
  common: {
    dashboard: "Dashboard",
    simulation: "Simulation",
    chat: "Chat",
    settings: "Settings",
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
  dashboard: {
    title: "Dashboard",
    description: "View system overview, usage statistics and latest updates",
    features: "Main Features",
  },
  chat: {
    title: "AI Chat",
    description: "Interact with AI assistants using natural language",
    greeting: {
      welcome: "Welcome to AI Assistant",
      introduction: "I'm your AI assistant, specialized in solving various challenges. As a professional AI assistant, I have the following characteristics:",
      persona: {
        traits: {
          0: "Expertise: Skilled in technical analysis, problem diagnosis, and solution design",
          1: "Interaction Style: Friendly, professional, and detail-oriented",
          2: "Work Approach: Structured thinking, clear logic"
        }
      },
      suggestions: {
        title: "You can ask me about:",
        item1: "Help analyze a technical issue or business scenario",
        item2: "Provide professional advice and best practices",
        item3: "Assist with solution design and decision making"
      }
    },
  },
  simulation: {
    title: "AI Simulation",
    description: "Manage and train AI agents, create scenarios, analyze performance",
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
      scenarioStatus: {
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
      agentStatus: {
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
      worldStatus: {
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
  },
  settings: {
    title: "Settings",
    description: "Configure personal info, preferences, security and system parameters",
  },
  admin: {
    title: "Admin",
    description: "Manage user permissions, system resources and operational status",
  }
} 