import React, { useState } from "react"
import {
  Box,
  Grid,
  Heading,
  HStack,
  Icon,
  Select,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  Spinner,
  Progress,
  Flex,
} from "@chakra-ui/react"
import {
  FiActivity,
  FiClock,
  FiUsers,
  FiZap,
} from "react-icons/fi"
import { useAnalytics, type MetricData, type ResourceData, type InsightData } from "../../../hooks/useAnalytics"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import { useI18n } from "../../../hooks/useI18n"

interface MetricCardProps {
  title: string
  value: string | number
  icon: any
  helpText?: string
}

function MetricCard({ title, value, icon, helpText }: MetricCardProps) {
  const bg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")

  return (
    <Box
      bg={bg}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      p={4}
    >
      <HStack spacing={3} mb={2}>
        <Icon as={icon} boxSize={5} color="blue.500" />
        <Stat>
          <StatLabel>{title}</StatLabel>
          <StatNumber>{value}</StatNumber>
          {helpText && <StatHelpText>{helpText}</StatHelpText>}
        </Stat>
      </HStack>
    </Box>
  )
}

interface PerformanceTabProps {
  metrics: MetricData
}

function PerformanceTab({ metrics }: PerformanceTabProps) {
  const { t } = useI18n()
  return (
    <Box>
      <Grid templateColumns="repeat(4, 1fr)" gap={4} mb={6}>
        <MetricCard
          title={t('simulation.analysis.metrics.totalSimulations')}
          value={metrics.totalSimulations}
          icon={FiActivity}
          helpText={t('simulation.analysis.metrics.last30Days')}
        />
        <MetricCard
          title={t('simulation.analysis.metrics.activeAgents')}
          value={metrics.activeAgents}
          icon={FiUsers}
          helpText={t('simulation.analysis.metrics.currentlyRunning')}
        />
        <MetricCard
          title={t('simulation.analysis.metrics.avgDuration')}
          value={metrics.avgDuration}
          icon={FiClock}
          helpText={t('simulation.analysis.metrics.perSimulation')}
        />
        <MetricCard
          title={t('simulation.analysis.metrics.successRate')}
          value={metrics.successRate}
          icon={FiZap}
          helpText={t('simulation.analysis.metrics.completedSimulations')}
        />
      </Grid>

      <Box mb={6}>
        <Heading size="md" mb={4}>
          {t('simulation.analysis.metrics.activityTimeline')}
        </Heading>
        <Box height="300px">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={metrics.recentActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3182ce"
                name={t('simulation.analysis.metrics.activityLevel')}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  )
}

interface ResourcesTabProps {
  resources: ResourceData
}

function ResourcesTab({ resources }: ResourcesTabProps) {
  const { t } = useI18n()
  return (
    <Box>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Box>
          <Heading size="md" mb={4}>
            {t('simulation.analysis.resources.cpuUsage')}
          </Heading>
          <Box height="200px">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={resources.cpu}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="usage"
                  stroke="#3182ce"
                  name={t('simulation.analysis.resources.cpuUsagePercent')}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
        <Box>
          <Heading size="md" mb={4}>
            {t('simulation.analysis.resources.memoryUsage')}
          </Heading>
          <Box height="200px">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={resources.memory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="usage"
                  stroke="#3182ce"
                  name={t('simulation.analysis.resources.memoryUsagePercent')}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Grid>
    </Box>
  )
}

interface InsightsTabProps {
  insights: InsightData
}

function InsightsTab({ insights }: InsightsTabProps) {
  const { t } = useI18n()
  return (
    <Box>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Box>
          <Heading size="md" mb={4}>
            {t('simulation.analysis.insights.agentPerformance')}
          </Heading>
          <Box height="300px">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={insights.agentPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="agent" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#3182ce" name={t('simulation.analysis.insights.performanceScore')} />
                <Bar dataKey="tasks" fill="#805ad5" name={t('simulation.analysis.insights.tasksCompleted')} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
        <Box>
          <Heading size="md" mb={4}>
            {t('simulation.analysis.insights.scenarioSuccessRates')}
          </Heading>
          <Box>
            {insights.scenarioSuccess.map((scenario: any) => (
              <Box key={scenario.scenario} mb={4}>
                <HStack justify="space-between" mb={1}>
                  <Text>{scenario.scenario}</Text>
                  <Text>
                    {scenario.success}/{scenario.total} (
                    {Math.round((scenario.success / scenario.total) * 100)}%)
                  </Text>
                </HStack>
                <Progress
                  value={(scenario.success / scenario.total) * 100}
                  colorScheme="blue"
                  size="sm"
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
    </Box>
  )
}

export default function AnalysisView() {
  const { t } = useI18n()
  const [timeRange, setTimeRange] = useState("24h")
  const bg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const { metrics, resources, insights, isLoading } = useAnalytics(timeRange)

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="200px">
        <Spinner size="xl" />
      </Flex>
    )
  }

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Select
          maxW="200px"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="24h">{t('simulation.analysis.timeRange.24h')}</option>
          <option value="7d">{t('simulation.analysis.timeRange.7d')}</option>
          <option value="30d">{t('simulation.analysis.timeRange.30d')}</option>
          <option value="custom">{t('simulation.analysis.timeRange.custom')}</option>
        </Select>
      </HStack>

      <Box
        bg={bg}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
        p={4}
      >
        <Tabs colorScheme="blue">
          <TabList mb={4}>
            <Tab>{t('simulation.analysis.metrics.title')}</Tab>
            <Tab>{t('simulation.analysis.resources.title')}</Tab>
            <Tab>{t('simulation.analysis.insights.title')}</Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={0}>
              <PerformanceTab metrics={metrics} />
            </TabPanel>
            <TabPanel p={0}>
              <ResourcesTab resources={resources} />
            </TabPanel>
            <TabPanel p={0}>
              <InsightsTab insights={insights} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  )
} 