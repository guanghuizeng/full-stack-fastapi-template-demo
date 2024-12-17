import React, { useState } from "react"
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Spinner,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Progress,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useAnalytics } from "../../../hooks/useAnalytics"
import { useI18n } from "../../../hooks/useI18n"
import type { MetricData, ResourceData, InsightData } from "../../../types"

// 模拟时间序列数据
const timeSeriesData = [
  { time: "00:00", value: 30 },
  { time: "04:00", value: 25 },
  { time: "08:00", value: 45 },
  { time: "12:00", value: 65 },
  { time: "16:00", value: 55 },
  { time: "20:00", value: 40 },
  { time: "24:00", value: 35 },
]

const resourceUsageData = [
  { time: "00:00", cpu: 30, memory: 45 },
  { time: "04:00", cpu: 35, memory: 40 },
  { time: "08:00", cpu: 45, memory: 50 },
  { time: "12:00", cpu: 65, memory: 60 },
  { time: "16:00", cpu: 55, memory: 55 },
  { time: "20:00", cpu: 40, memory: 45 },
  { time: "24:00", cpu: 35, memory: 40 },
]

const insightData = [
  { name: "对话", success: 85, total: 100 },
  { name: "任务", success: 65, total: 80 },
  { name: "决策", success: 45, total: 50 },
  { name: "协作", success: 35, total: 40 },
]

interface PerformanceTabProps {
  metrics: MetricData;
}

function PerformanceTab({ metrics }: PerformanceTabProps) {
  const { t } = useI18n()
  const statBg = useColorModeValue("white", "gray.700")
  const chartBg = useColorModeValue("white", "gray.800")

  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} mb={8}>
        <Stat bg={statBg} p={4} borderRadius="lg" boxShadow="sm">
          <StatLabel>{t('simulation.analysis.metrics.totalSimulations')}</StatLabel>
          <StatNumber>{metrics.totalSimulations}</StatNumber>
          <StatHelpText>{t('simulation.analysis.metrics.last30Days')}</StatHelpText>
        </Stat>
        <Stat bg={statBg} p={4} borderRadius="lg" boxShadow="sm">
          <StatLabel>{t('simulation.analysis.metrics.activeAgents')}</StatLabel>
          <StatNumber>{metrics.activeAgents}</StatNumber>
          <StatHelpText>{t('simulation.analysis.metrics.currentlyRunning')}</StatHelpText>
        </Stat>
        <Stat bg={statBg} p={4} borderRadius="lg" boxShadow="sm">
          <StatLabel>{t('simulation.analysis.metrics.avgDuration')}</StatLabel>
          <StatNumber>{metrics.avgDuration}m</StatNumber>
          <StatHelpText>{t('simulation.analysis.metrics.perSimulation')}</StatHelpText>
        </Stat>
        <Stat bg={statBg} p={4} borderRadius="lg" boxShadow="sm">
          <StatLabel>{t('simulation.analysis.metrics.successRate')}</StatLabel>
          <StatNumber>{metrics.successRate}%</StatNumber>
          <StatHelpText>{t('simulation.analysis.metrics.completedSimulations')}</StatHelpText>
        </Stat>
      </SimpleGrid>

      <Box bg={chartBg} p={4} borderRadius="lg" boxShadow="sm" mb={8}>
        <Text fontSize="lg" fontWeight="medium" mb={4}>
          {t('simulation.analysis.metrics.activityTimeline')}
        </Text>
        <Box height="300px">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="value"
                name={t('simulation.analysis.metrics.activityLevel')}
                stroke="#3182ce"
                fill="#3182ce"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  )
}

interface ResourcesTabProps {
  resources: ResourceData;
}

function ResourcesTab({ resources }: ResourcesTabProps) {
  const { t } = useI18n()
  const statBg = useColorModeValue("white", "gray.700")
  const chartBg = useColorModeValue("white", "gray.800")

  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={8}>
        <Box bg={statBg} p={4} borderRadius="lg" boxShadow="sm">
          <VStack align="stretch" spacing={4}>
            <Text fontWeight="medium">{t('simulation.analysis.resources.cpuUsage')}</Text>
            <Progress value={resources.cpuUsage} size="lg" colorScheme="blue" />
            <Text fontSize="sm" color="gray.500">
              {resources.cpuUsage}% {t('simulation.analysis.resources.cpuUsagePercent')}
            </Text>
          </VStack>
        </Box>
        <Box bg={statBg} p={4} borderRadius="lg" boxShadow="sm">
          <VStack align="stretch" spacing={4}>
            <Text fontWeight="medium">{t('simulation.analysis.resources.memoryUsage')}</Text>
            <Progress value={resources.memoryUsage} size="lg" colorScheme="green" />
            <Text fontSize="sm" color="gray.500">
              {resources.memoryUsage}% {t('simulation.analysis.resources.memoryUsagePercent')}
            </Text>
          </VStack>
        </Box>
      </SimpleGrid>

      <Box bg={chartBg} p={4} borderRadius="lg" boxShadow="sm">
        <Text fontSize="lg" fontWeight="medium" mb={4}>
          {t('simulation.analysis.resources.title')}
        </Text>
        <Box height="300px">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={resourceUsageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="cpu"
                name={t('simulation.analysis.resources.cpuUsage')}
                stroke="#3182ce"
              />
              <Line
                type="monotone"
                dataKey="memory"
                name={t('simulation.analysis.resources.memoryUsage')}
                stroke="#38a169"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  )
}

interface InsightsTabProps {
  insights: InsightData;
}

function InsightsTab({ insights }: InsightsTabProps) {
  const { t } = useI18n()
  const statBg = useColorModeValue("white", "gray.700")
  const chartBg = useColorModeValue("white", "gray.800")

  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={8}>
        <Stat bg={statBg} p={4} borderRadius="lg" boxShadow="sm">
          <StatLabel>{t('simulation.analysis.insights.agentPerformance')}</StatLabel>
          <StatNumber>{insights.agentPerformance}%</StatNumber>
          <Progress value={insights.agentPerformance} size="sm" colorScheme="blue" mt={2} />
        </Stat>
        <Stat bg={statBg} p={4} borderRadius="lg" boxShadow="sm">
          <StatLabel>{t('simulation.analysis.insights.tasksCompleted')}</StatLabel>
          <StatNumber>{insights.tasksCompleted}</StatNumber>
          <Progress value={(insights.tasksCompleted / 300) * 100} size="sm" colorScheme="green" mt={2} />
        </Stat>
        <Stat bg={statBg} p={4} borderRadius="lg" boxShadow="sm">
          <StatLabel>{t('simulation.analysis.insights.scenarioSuccessRates')}</StatLabel>
          <StatNumber>{insights.scenarioSuccessRates}%</StatNumber>
          <Progress value={insights.scenarioSuccessRates} size="sm" colorScheme="purple" mt={2} />
        </Stat>
      </SimpleGrid>

      <Box bg={chartBg} p={4} borderRadius="lg" boxShadow="sm">
        <Text fontSize="lg" fontWeight="medium" mb={4}>
          {t('simulation.analysis.insights.scenarioSuccessRates')}
        </Text>
        <Box height="300px">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={insightData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="success"
                name={t('simulation.analysis.insights.tasksCompleted')}
                fill="#3182ce"
              />
              <Bar
                dataKey="total"
                name={t('simulation.analysis.metrics.totalSimulations')}
                fill="#805ad5"
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  )
}

export default function AnalysisView() {
  const { t } = useI18n()
  const { metrics, resources, insights, isLoading } = useAnalytics()
  const [tabIndex, setTabIndex] = useState(0)

  if (isLoading || !metrics || !resources || !insights) {
    return (
      <Flex justify="center" align="center" height="200px">
        <Spinner size="xl" />
      </Flex>
    )
  }

  return (
    <Box>
      <Tabs index={tabIndex} onChange={setTabIndex}>
        <TabList>
          <Tab>{t('simulation.analysis.metrics.title')}</Tab>
          <Tab>{t('simulation.analysis.resources.title')}</Tab>
          <Tab>{t('simulation.analysis.insights.title')}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <PerformanceTab metrics={metrics} />
          </TabPanel>
          <TabPanel>
            <ResourcesTab resources={resources} />
          </TabPanel>
          <TabPanel>
            <InsightsTab insights={insights} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
} 