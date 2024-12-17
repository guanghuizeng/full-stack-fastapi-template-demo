export default {
  common: {
    dashboard: "控制台",
    simulation: "AI助手",
    chat: "对话",
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
    save: "保存",
    default: "默认",
    logout: "退出登录",
    send: "发送",
    retry: "重试",
    copy: "复制",
    upload: "上传",
    download: "下载",
    more: "更多",
  },
  dashboard: {
    title: "控制台",
    description: "查看系统概况、使用统计和最新动态",
    features: "主要功能",
  },
  chat: {
    title: "智能对话",
    description: "与AI助手进行自然语言交互，获取帮助和建议",
    newChat: "新建对话",
    searchPlaceholder: "搜索对话历史...",
    inputPlaceholder: "输入消息...",
    noMessages: "暂无消息",
    loadMore: "加载更多",
    messageActions: {
      copy: "复制",
      quote: "引用",
      edit: "编辑",
      delete: "删除",
      retry: "重试"
    },
    toolbar: {
      upload: "上传文件",
      emoji: "表情",
      code: "代码块",
      clear: "清空"
    },
    status: {
      online: "在线",
      offline: "离线",
      typing: "正在输入...",
      thinking: "思考中...",
      generating: "生成中...",
    },
    errors: {
      sendFailed: "发送失败",
      networkError: "网络错误",
      uploadFailed: "上传失败",
      invalidFormat: "格式不支持"
    },
    agent: {
      switch: "切换助手",
      add: "添加助手",
      remove: "移除助手",
      configure: "配置助手",
      profile: "助手信息",
    },
    context: {
      title: "上下文信息",
      knowledge: "知识库",
      reference: "参考资料",
      history: "历史记录",
      variables: "环境变量"
    },
    objectives: {
      title: "对话目标",
      add: "添加目标",
      edit: "编目标",
      remove: "删除目标",
      complete: "完成目标",
      progress: "目标进度"
    },
    settings: {
      title: "对话设置",
      general: {
        title: "基本设置",
        theme: "界面主题",
        fontSize: "字体大小",
        messageLayout: "消息布局"
      },
      notification: {
        title: "通知设置",
        sound: "声音提醒",
        desktop: "桌面通知",
        mention: "@提醒"
      },
      privacy: {
        title: "隐私设置",
        history: "保存历史",
        share: "分享记录",
        data: "数据使用"
      }
    }
  },
  settings: {
    title: "系统设置",
    description: "配置个人信息、界面偏好、安全选项和系统参数",
    profile: {
      title: "个人信息",
      basicInfo: "基本信息",
      avatar: "头像",
      uploadAvatar: "上传头像",
      username: "用户名",
      email: "邮箱",
      emailRequired: "请输入邮箱地址",
      emailInvalid: "请输入有效的邮箱地址",
      fullName: "姓名",
      bio: "个人简介",
      bioPlaceholder: "请输入个人简介",
      updateSuccess: "个人信息更新成功",
      updateError: "个人信��更新失败",
      deleteSuccess: "账号已成功删除",
      deleteConfirmTitle: "确认删除账号",
      deleteConfirmMessage: "您的所有账号数据将被永久删除。如果确定，请点击\"确认\"继续。此操作无法撤销。"
    },
    preferences: {
      title: "偏好设置",
      theme: {
        title: "主题设置",
        light: "浅色模式",
        dark: "深色模式",
        system: "跟随系统"
      },
      language: {
        title: "语言设置",
        chinese: "中文",
        english: "English"
      },
      notifications: {
        title: "通知设置",
        email: "邮件通知",
        push: "推送通知",
        desktop: "桌面通知",
        sound: "音提醒"
      },
      privacy: {
        title: "隐私设置",
        shareData: "共享使用数据",
        shareDataDesc: "帮助我们改进产品体验",
        activityLog: "活动记录",
        activityLogDesc: "记录您的操作历史"
      }
    },
    security: {
      title: "安全设置",
      password: {
        title: "修改密码",
        current: "当前密码",
        currentRequired: "请输入当前密码",
        new: "新密码",
        confirm: "确认密码",
        required: "请输入密码",
        confirmRequired: "请确认密码",
        updateSuccess: "密码修改成功",
        updateError: "密码修改失败",
        mismatch: "两次输入的密码不一致",
        requirements: "密码要求：",
        minLength: "密码长度至少为8个字符",
        needNumber: "密码必须包含数字",
        needLetter: "密码必须包含字母",
        needSpecial: "密码必须包含特殊字符"
      },
      twoFactor: {
        title: "两步验证",
        enable: "启用两步验证",
        disable: "关闭两步验证",
        status: "当前状态",
        enableSuccess: "两步验证已启用",
        disableSuccess: "两步验证已关闭",
        setupGuide: "设置指南"
      },
      sessions: {
        title: "登录设备",
        current: "当前设备",
        otherDevices: "其他设备",
        lastActive: "最后活动时间",
        location: "登录地点",
        device: "设备信息",
        logoutAll: "退出所有设备",
        logoutSuccess: "已退出所有设备"
      }
    },
    api: {
      title: "API设置",
      keys: {
        title: "API密钥",
        create: "创建密钥",
        delete: "删除密钥",
        name: "密钥名称",
        token: "密钥令牌",
        created: "创建时间",
        expires: "过期时间",
        lastUsed: "最后使用",
        noExpiry: "永不过期",
        createSuccess: "API密钥创建成功",
        deleteSuccess: "API密钥删除成功"
      },
      usage: {
        title: "使用情况",
        limit: "使用限制",
        current: "当前使用量",
        reset: "重置时间",
        upgrade: "升级配额"
      }
    },
    billing: {
      title: "账单设置",
      subscription: {
        title: "订阅计划",
        current: "当前计划",
        upgrade: "升级",
        downgrade: "降级",
        cancel: "取消订阅",
        renew: "续费"
      },
      payment: {
        title: "支付方式",
        add: "添加支付方式",
        edit: "编辑支付方式",
        delete: "删除支付方式",
        default: "默认支付方式"
      },
      history: {
        title: "账单记录",
        date: "日期",
        description: "描述",
        amount: "金额",
        status: "状态",
        download: "下载发票"
      }
    }
  },
  simulation: {
    title: "AI助手系统",
    description: "管理和训练AI助手，创建对话场景，分析性能数据",
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
      environmentPlaceholder: "输入环境名称",
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
      },
      status: {
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
  },
  admin: {
    title: "管理后台",
    description: "管理用户权限、系统资源和运行状态",
  }
} 