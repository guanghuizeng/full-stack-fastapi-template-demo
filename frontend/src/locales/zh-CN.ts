export default {
  common: {
    dashboard: "控制台",
    simulation: "AI助手",
    settings: "系统设置",
    admin: "管理后台",
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
    title: "AI助手系统",
    scenarios: {
      title: "对话场景",
      templates: "场景模板",
      activeScenarios: "进行中的对话",
      createScenario: "新建对话",
      createFromTemplate: "基于 {{name}} 模板创建",
      createSuccess: "对话创建成功",
      createError: "对话创建失败，请重试",
      name: "名称",
      namePlaceholder: "请输入对话名称",
      type: "类型",
      description: "描述",
      descriptionPlaceholder: "请输入对话描述",
      progress: "进度",
      successRate: "成功率",
      tasks: "任务",
      objectives: "目标",
      requiredAgents: "所需助手",
      types: {
        chat: "自由对话",
        task: "任务导向",
        decision: "决策辅助",
        collaboration: "多人协作",
        all: "所有类型"
      },
      scenarioStatus: {
        active: "进行中",
        completed: "已完成",
        failed: "失败",
        draft: "草稿"
      },
      chat: {
        inputPlaceholder: "请输入您的消息...",
        send: "发送"
      }
    },
    agents: {
      title: "AI助手",
      createAgent: "创建助手",
      editAgent: "编辑助手",
      name: "名称",
      namePlaceholder: "请输入助手名称",
      type: "类型",
      description: "描述",
      descriptionPlaceholder: "请输入助手描述",
      experience: "专业水平",
      traits: "特征标签",
      traitsPlaceholder: "请输入特征标签，用逗号分隔",
      train: "训练",
      deploy: "部署",
      types: {
        persona: "个性化助手",
        service: "客服助手",
        analyst: "分析助手"
      },
      agentStatus: {
        active: "服务中",
        ready: "就绪",
        training: "训练中",
        all: "所有状态"
      },
      experienceLevels: {
        beginner: "入门级",
        intermediate: "进阶级",
        advanced: "专家级",
        expert: "资深专家"
      }
    },
    worlds: {
      title: "运行环境",
      createWorld: "创建环境",
      configureWorld: "配置环境",
      configure: "配置",
      complexity: "复杂度",
      agentCount: "助手数量",
      resourceUsage: "资源占用",
      maxAgents: "最大助手数量",
      timeScale: "时间比例",
      environment: "环境名称",
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
      worldStatus: {
        active: "运行中",
        standby: "待机",
        configuring: "配置中",
        all: "所有状态"
      }
    },
    analysis: {
      title: "数据分析",
      metrics: {
        title: "性能指标",
        totalSimulations: "总对话次数",
        activeAgents: "活跃助手",
        avgDuration: "平均时长",
        successRate: "成功率",
        last30Days: "最近30天",
        currentlyRunning: "当前运行中",
        perSimulation: "每次对话",
        completedSimulations: "已完成对话",
        activityTimeline: "活动时间线",
        activityLevel: "活动水平"
      },
      resources: {
        title: "资源使用",
        cpuUsage: "CPU使用率",
        memoryUsage: "内存使用率",
        cpuUsagePercent: "CPU使用率 (%)",
        memoryUsagePercent: "内存使用率 (%)"
      },
      insights: {
        title: "智能洞察",
        agentPerformance: "助手表现",
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