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
import { useAnalytics } from "../../../hooks/useAnalytics"
import { useI18n } from "../../../hooks/useI18n"
import type { MetricData, ResourceData, InsightData } from "../../../types"

interface PerformanceTabProps {
  metrics: MetricData;
}

function PerformanceTab({ metrics }: PerformanceTabProps) {
  const { t } = useI18n()
  const statBg = useColorModeValue("white", "gray.700")

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
    </Box>
  )
}

interface ResourcesTabProps {
  resources: ResourceData;
}

function ResourcesTab({ resources }: ResourcesTabProps) {
  const { t } = useI18n()
  const statBg = useColorModeValue("white", "gray.700")

  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
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
    </Box>
  )
}

interface InsightsTabProps {
  insights: InsightData;
}

function InsightsTab({ insights }: InsightsTabProps) {
  const { t } = useI18n()
  const statBg = useColorModeValue("white", "gray.700")

  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
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