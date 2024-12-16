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
  return (
    <Box>
      <Grid templateColumns="repeat(4, 1fr)" gap={4} mb={6}>
        <MetricCard
          title="Total Simulations"
          value={metrics.totalSimulations}
          icon={FiActivity}
          helpText="Last 30 days"
        />
        <MetricCard
          title="Active Agents"
          value={metrics.activeAgents}
          icon={FiUsers}
          helpText="Currently running"
        />
        <MetricCard
          title="Average Duration"
          value={metrics.avgDuration}
          icon={FiClock}
          helpText="Per simulation"
        />
        <MetricCard
          title="Success Rate"
          value={metrics.successRate}
          icon={FiZap}
          helpText="Completed simulations"
        />
      </Grid>

      <Box mb={6}>
        <Heading size="md" mb={4}>
          Activity Timeline
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
                name="Activity Level"
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
  return (
    <Box>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Box>
          <Heading size="md" mb={4}>
            CPU Usage
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
                  name="CPU Usage (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
        <Box>
          <Heading size="md" mb={4}>
            Memory Usage
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
                  name="Memory Usage (%)"
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
  return (
    <Box>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Box>
          <Heading size="md" mb={4}>
            Agent Performance
          </Heading>
          <Box height="300px">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={insights.agentPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="agent" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#3182ce" name="Performance Score" />
                <Bar dataKey="tasks" fill="#805ad5" name="Tasks Completed" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
        <Box>
          <Heading size="md" mb={4}>
            Scenario Success Rates
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
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="custom">Custom Range</option>
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
            <Tab>Performance</Tab>
            <Tab>Resources</Tab>
            <Tab>Insights</Tab>
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