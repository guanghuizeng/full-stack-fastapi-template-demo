export default {
  common: {
    dashboard: "仪表盘",
    simulation: "人格模拟",
    settings: "用户设置",
    admin: "管理员",
    create: "创建",
    edit: "编辑",
    delete: "删除",
    cancel: "取消",
    confirm: "确认",
    loading: "加载中...",
    success: "操作成功",
    error: "操作失败",
    filter: "筛选",
    all: "全部",
    view: "查看详情",
    update: "更新",
    name: "名称",
    description: "描述",
    start: "启动",
    stop: "停止",
  },
  simulation: {
    title: "AI 人格模拟",
    scenarios: {
      title: "场景",
      templates: "模板",
      activeScenarios: "活动场景",
      createScenario: "创建场景",
      createFromTemplate: "从 {{name}} 模板创建场景",
      createSuccess: "场景创建成功",
      createError: "场景创建失败，请重试",
      name: "名称",
      namePlaceholder: "请输入场景名称",
      type: "类型",
      description: "描述",
      descriptionPlaceholder: "请输入场景描述",
      status: "状态",
      progress: "进度",
      successRate: "成功率",
      tasks: "任务",
      objectives: "目标",
      requiredAgents: "所需角色",
      types: {
        chat: "对话",
        task: "任务",
        decision: "决策",
        collaboration: "协作",
        all: "所有类型"
      },
      status: {
        active: "进行中",
        completed: "已完成",
        failed: "失败",
        draft: "草稿"
      }
    },
    agents: {
      title: "角色",
      createAgent: "创建角色",
      editAgent: "编辑角色",
      name: "名称",
      namePlaceholder: "请输入角色名称",
      type: "类型",
      description: "描述",
      descriptionPlaceholder: "请输入角色描述",
      status: "状态",
      experience: "经验等级",
      traits: "特征",
      traitsPlaceholder: "请输入角色特征，用逗号分隔",
      train: "训练",
      deploy: "部署",
      types: {
        persona: "人格",
        service: "客服",
        analyst: "分析师"
      },
      status: {
        active: "活动",
        ready: "就绪",
        training: "训练中",
        all: "所有状态"
      },
      experienceLevels: {
        beginner: "初级",
        intermediate: "中级",
        advanced: "高级",
        expert: "专家"
      }
    },
    worlds: {
      title: "环境",
      createWorld: "创建环境",
      configureWorld: "配置环境",
      configure: "配置",
      status: "状态",
      complexity: "复杂度",
      agentCount: "角色数量",
      resourceUsage: "资源使用",
      maxAgents: "最大角色数量",
      timeScale: "时间比例",
      environment: "环境",
      constraints: "约束条件",
      namePlaceholder: "请输入环境名称",
      descriptionPlaceholder: "请输入环境描述",
      environmentPlaceholder: "请输入环境名称",
      constraintsPlaceholder: "请输入约束条件，用逗号分隔",
      complexityLevels: {
        low: "低",
        medium: "中",
        high: "高"
      },
      status: {
        active: "运行中",
        standby: "待机",
        configuring: "配置中",
        all: "所有状态"
      }
    },
    analysis: {
      title: "分析",
      metrics: {
        title: "性能指标",
        totalSimulations: "总模拟次数",
        activeAgents: "活动角色",
        avgDuration: "平均持续时间",
        successRate: "成功率",
        last30Days: "最近30天",
        currentlyRunning: "当前运行中",
        perSimulation: "每次模拟",
        completedSimulations: "已完成的模拟",
        activityTimeline: "活动时间线",
        activityLevel: "活动水平"
      },
      resources: {
        title: "资源",
        cpuUsage: "CPU 使用率",
        memoryUsage: "内存使用率",
        cpuUsagePercent: "CPU 使用率 (%)",
        memoryUsagePercent: "内存使用率 (%)"
      },
      insights: {
        title: "洞察",
        agentPerformance: "角色表现",
        performanceScore: "表现得分",
        tasksCompleted: "已完成任务",
        scenarioSuccessRates: "场景成功率"
      },
      timeRange: {
        "24h": "最近24小时",
        "7d": "最近7天",
        "30d": "最近30天",
        custom: "自定义范围"
      }
    }
  }
} 