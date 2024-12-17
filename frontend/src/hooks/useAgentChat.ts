import { useState, useCallback } from "react"
import type { Agent } from "../types"

// 模拟的当前助手信息
const mockCurrentAgent: Agent = {
  id: "default-agent",
  name: "技术顾问助手",
  type: "analyst",
  description: "我是一位专业的技术顾问助手，擅长技术分析、架构设计和问题诊断。我可以帮助您分析技术问题、优化系统架构、制定技术方案。",
  status: "active",
  traits: ["专业", "严谨", "创新"],
  experience: "expert"
}

// 模拟的对话回复模板
const RESPONSES = {
  greeting: [
    "您好！我是您的AI助手。请问有什么可以帮您？",
    "很高兴见到您！我能为您做些什么？",
    "您好！让我们开始今天的对话。"
  ],
  understanding: [
    "我理解您的需求。让我们一步步分析这个问题。",
    "这是一个很好的问题。让我为您详细解答。",
    "我明白您的意思了。让我整理一下思路。"
  ],
  analysis: [
    "这个问题需要从几个方面来看：\n1. {point1}\n2. {point2}\n3. {point3}",
    "让我们分析一下关键因素：\n- {point1}\n- {point2}\n- {point3}",
    "我建议从以下几个角度思考：\n1. {point1}\n2. {point2}\n3. {point3}"
  ],
  code: [
    "这里有一个示例代码：\n```{language}\n{code}\n```",
    "让我用代码演示一下：\n```{language}\n{code}\n```",
    "这段代码可以帮助理解：\n```{language}\n{code}\n```"
  ],
  conclusion: [
    "总的来说，{summary}",
    "简单总结一下：{summary}",
    "最后，{summary}"
  ]
}

// 示例代码模板
const CODE_EXAMPLES = {
  typescript: [
    {
      code: `interface Config {
  apiKey: string;
  endpoint: string;
  timeout?: number;
}

class ApiClient {
  constructor(private config: Config) {}
  
  async request() {
    // 实现请求逻辑
  }
}`,
      context: "API客户端"
    },
    {
      code: `type Handler<T> = (data: T) => Promise<void>;

class EventBus<T> {
  private handlers: Handler<T>[] = [];

  subscribe(handler: Handler<T>) {
    this.handlers.push(handler);
  }

  async publish(data: T) {
    await Promise.all(
      this.handlers.map(handler => handler(data))
    );
  }
}`,
      context: "事件总线"
    }
  ],
  python: [
    {
      code: `from typing import List, Dict

def process_data(items: List[Dict]) -> Dict:
    result = {}
    for item in items:
        key = item.get('id')
        if key:
            result[key] = {
                'name': item.get('name'),
                'value': item.get('value', 0)
            }
    return result`,
      context: "数据处理"
    },
    {
      code: `class CacheManager:
    def __init__(self, max_size: int = 100):
        self.cache = {}
        self.max_size = max_size
    
    def get(self, key: str) -> any:
        return self.cache.get(key)
    
    def set(self, key: str, value: any) -> None:
        if len(self.cache) >= self.max_size:
            self.cache.pop(next(iter(self.cache)))
        self.cache[key] = value`,
      context: "缓存管理"
    }
  ]
}

export interface Message {
  id: string;
  content: string;
  type: 'text' | 'code' | 'image';
  language?: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    isAgent?: boolean;
  };
  timestamp: string;
  status?: 'sending' | 'sent' | 'error' | 'read';
  replyTo?: Message;
}

export function useAgentChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState<string[]>([]);
  const [currentAgent] = useState<Agent>(mockCurrentAgent);

  // 生成随机延迟时间
  const getThinkingTime = () => Math.floor(Math.random() * 1000) + 500;
  const getTypingTime = (content: string) => Math.min(content.length * 50, 2000);

  // 选择合适的回复
  const selectResponse = (userMessage: string): Message => {
    // 检查是否包含代码相关关键词
    const codeKeywords = ['代码', '示例', 'code', 'example', '怎么写', '如何实现'];
    const shouldShowCode = codeKeywords.some(keyword => 
      userMessage.toLowerCase().includes(keyword)
    );

    let content: string;
    let type: 'text' | 'code' = 'text';
    let language: string | undefined;

    if (shouldShowCode) {
      // 选择编程语言
      const languages = Object.keys(CODE_EXAMPLES);
      language = languages[Math.floor(Math.random() * languages.length)];
      
      // 选择代码示例
      const examples = CODE_EXAMPLES[language as keyof typeof CODE_EXAMPLES];
      const example = examples[Math.floor(Math.random() * examples.length)];
      
      // 使用代码模板
      const template = RESPONSES.code[Math.floor(Math.random() * RESPONSES.code.length)];
      content = template
        .replace('{language}', language)
        .replace('{code}', example.code);
      
      type = 'code';
    } else {
      // 选择文���回复
      const templates = RESPONSES.understanding;
      content = templates[Math.floor(Math.random() * templates.length)];
    }

    return {
      id: Math.random().toString(36).substr(2, 9),
      content,
      type,
      language,
      sender: {
        id: 'agent-1',
        name: 'AI助手',
        isAgent: true
      },
      timestamp: new Date().toISOString(),
      status: 'sent'
    };
  };

  // 更新上下文
  const updateContext = (message: string) => {
    setContext(prev => [...prev.slice(-4), message]);
  };

  // 发送消息
  const sendMessage = useCallback(async (content: string, type: 'text' | 'code' = 'text') => {
    setIsLoading(true);
    try {
      // 创建用户消息
      const userMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        content,
        type,
        sender: {
          id: 'user-1',
          name: '用户',
          isAgent: false
        },
        timestamp: new Date().toISOString(),
        status: 'sending'
      };

      // 添加用户消息
      setMessages(prev => [...prev, { ...userMessage, status: 'sent' }]);
      updateContext(content);

      // 模拟AI思考
      await new Promise(resolve => setTimeout(resolve, getThinkingTime()));
      
      // 生成AI回复
      const agentResponse = selectResponse(content);
      
      // 模拟打字时间
      await new Promise(resolve => setTimeout(resolve, getTypingTime(agentResponse.content)));
      
      // 添加AI回复
      setMessages(prev => [...prev, agentResponse]);
      updateContext(agentResponse.content);

    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 清空对话
  const clearMessages = useCallback(() => {
    setMessages([]);
    setContext([]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    context,
    currentAgent
  };
}

export default useAgentChat; 