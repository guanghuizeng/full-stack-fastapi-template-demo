import React, { useState } from "react"
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  Tag,
  Spinner,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  VStack,
  Progress,
} from "@chakra-ui/react"
import {
  FiFilter,
  FiPlus,
  FiMessageSquare,
  FiCheckSquare,
  FiGitBranch,
  FiUsers,
  FiPlay,
  FiEye,
} from "react-icons/fi"
import { useNavigate } from "@tanstack/react-router"
import { useScenarios, type ScenarioTemplate, type ScenarioInstance } from "../../../hooks/useScenarios"
import { useI18n } from "../../../hooks/useI18n"
import CreateScenarioModal from "./CreateScenarioModal"

const scenarioTypeIcons = {
  chat: FiMessageSquare,
  task: FiCheckSquare,
  decision: FiGitBranch,
  collaboration: FiUsers,
}

const scenarioTypeColors = {
  chat: "blue",
  task: "green",
  decision: "purple",
  collaboration: "orange",
}

function TemplateCard({ template, onSelect }: { template: ScenarioTemplate; onSelect: () => void }) {
  const { t } = useI18n()
  const bg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")

  return (
    <Box
      bg={bg}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      p={4}
      _hover={{
        transform: "translateY(-2px)",
        shadow: "md",
        transition: "all 0.2s",
      }}
    >
      <HStack spacing={3} mb={3}>
        <Icon
          as={scenarioTypeIcons[template.type]}
          boxSize={6}
          color={`${scenarioTypeColors[template.type]}.500`}
        />
        <Text fontSize="lg" fontWeight="bold">
          {template.name}
        </Text>
      </HStack>

      <Text color="gray.500" mb={4} noOfLines={2}>
        {template.description}
      </Text>

      <VStack align="stretch" spacing={3}>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2}>
            {t('simulation.scenarios.objectives')}
          </Text>
          {template.objectives.map((objective, index) => (
            <Text key={index} fontSize="sm" color="gray.600">
              • {objective}
            </Text>
          ))}
        </Box>

        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2}>
            {t('simulation.scenarios.requiredAgents')}
          </Text>
          {template.requiredAgents.map((agent, index) => (
            <HStack key={index} spacing={2}>
              <Tag size="sm" colorScheme={scenarioTypeColors[template.type]}>
                {agent.role}
              </Tag>
              <Text fontSize="sm" color="gray.600">
                x{agent.count}
              </Text>
            </HStack>
          ))}
        </Box>
      </VStack>

      <HStack spacing={2} mt={4}>
        <Button
          colorScheme={scenarioTypeColors[template.type]}
          size="sm"
          leftIcon={<Icon as={FiPlay} />}
          onClick={onSelect}
        >
          {t('simulation.scenarios.createScenario')}
        </Button>
      </HStack>
    </Box>
  )
}

function InstanceCard({ instance }: { instance: ScenarioInstance }) {
  const { t } = useI18n()
  const bg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const navigate = useNavigate()

  const handleViewDetails = () => {
    navigate({ to: "/simulation/scenario/$scenarioId", params: { scenarioId: instance.id } })
  }

  return (
    <Box
      bg={bg}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      p={4}
      _hover={{
        transform: "translateY(-2px)",
        shadow: "md",
        transition: "all 0.2s",
      }}
    >
      <HStack spacing={3} mb={3}>
        <Icon
          as={scenarioTypeIcons[instance.type]}
          boxSize={6}
          color={`${scenarioTypeColors[instance.type]}.500`}
        />
        <VStack align="start" spacing={0}>
          <Text fontSize="lg" fontWeight="bold">
            {instance.name}
          </Text>
          <Tag size="sm" colorScheme={instance.status === "active" ? "green" : "gray"}>
            {t(`simulation.scenarios.status.${instance.status}`)}
          </Tag>
        </VStack>
      </HStack>

      <Text color="gray.500" mb={4} noOfLines={2}>
        {instance.description}
      </Text>

      {instance.metrics && (
        <VStack align="stretch" spacing={3}>
          <Box>
            <HStack justify="space-between" mb={1}>
              <Text fontSize="sm" color="gray.500">
                {t('simulation.scenarios.progress')}
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                {instance.metrics.progress}%
              </Text>
            </HStack>
            <Progress
              value={instance.metrics.progress}
              size="sm"
              colorScheme={scenarioTypeColors[instance.type]}
            />
          </Box>

          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <Box>
              <Text fontSize="sm" color="gray.500">
                {t('simulation.scenarios.successRate')}
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                {instance.metrics.successRate}%
              </Text>
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.500">
                {t('simulation.scenarios.tasks')}
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                {instance.metrics.completedTasks}
              </Text>
            </Box>
          </Grid>
        </VStack>
      )}

      <HStack spacing={2} mt={4}>
        <Button
          colorScheme={scenarioTypeColors[instance.type]}
          size="sm"
          leftIcon={<Icon as={FiEye} />}
          onClick={handleViewDetails}
          isDisabled={instance.status !== "active"}
        >
          {t('common.view')}
        </Button>
      </HStack>
    </Box>
  )
}

export default function ScenariosView() {
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState(0)
  const [filter, setFilter] = useState<string>("all")
  const { templates, instances, isLoading } = useScenarios()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedTemplate, setSelectedTemplate] = useState<ScenarioTemplate>()

  const handleCreateFromTemplate = (template: ScenarioTemplate) => {
    setSelectedTemplate(template)
    onOpen()
  }

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="200px">
        <Spinner size="xl" />
      </Flex>
    )
  }

  return (
    <Box>
      <Tabs index={activeTab} onChange={setActiveTab} colorScheme="blue">
        <TabList mb={6}>
          <Tab>{t('simulation.scenarios.templates')}</Tab>
          <Tab>{t('simulation.scenarios.activeScenarios')}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={0}>
            <Flex justify="space-between" align="center" mb={6}>
              <HStack spacing={4}>
                <Menu>
                  <MenuButton
                    as={Button}
                    leftIcon={<Icon as={FiFilter} />}
                    variant="outline"
                  >
                    {t('common.filter')}: {t(`simulation.scenarios.types.${filter}`)}
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => setFilter("all")}>{t('common.all')}</MenuItem>
                    <MenuItem onClick={() => setFilter("chat")}>{t('simulation.scenarios.types.chat')}</MenuItem>
                    <MenuItem onClick={() => setFilter("task")}>{t('simulation.scenarios.types.task')}</MenuItem>
                    <MenuItem onClick={() => setFilter("decision")}>{t('simulation.scenarios.types.decision')}</MenuItem>
                    <MenuItem onClick={() => setFilter("collaboration")}>{t('simulation.scenarios.types.collaboration')}</MenuItem>
                  </MenuList>
                </Menu>
              </HStack>

              <Button
                colorScheme="blue"
                leftIcon={<Icon as={FiPlus} />}
                onClick={() => {
                  setSelectedTemplate(undefined)
                  onOpen()
                }}
              >
                {t('simulation.scenarios.createScenario')}
              </Button>
            </Flex>

            <Grid
              templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
              gap={6}
              mb={8}
            >
              {templates
                .filter(template => filter === "all" || template.type === filter)
                .map(template => (
                  <TemplateCard 
                    key={template.id} 
                    template={template} 
                    onSelect={() => handleCreateFromTemplate(template)}
                  />
                ))}
            </Grid>
          </TabPanel>

          <TabPanel p={0}>
            <Flex justify="space-between" align="center" mb={6}>
              <HStack spacing={4}>
                <Menu>
                  <MenuButton
                    as={Button}
                    leftIcon={<Icon as={FiFilter} />}
                    variant="outline"
                  >
                    {t('common.filter')}: {t(`simulation.scenarios.types.${filter}`)}
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => setFilter("all")}>{t('common.all')}</MenuItem>
                    <MenuItem onClick={() => setFilter("chat")}>{t('simulation.scenarios.types.chat')}</MenuItem>
                    <MenuItem onClick={() => setFilter("task")}>{t('simulation.scenarios.types.task')}</MenuItem>
                    <MenuItem onClick={() => setFilter("decision")}>{t('simulation.scenarios.types.decision')}</MenuItem>
                    <MenuItem onClick={() => setFilter("collaboration")}>{t('simulation.scenarios.types.collaboration')}</MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            </Flex>

            <Grid
              templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
              gap={6}
              mb={8}
            >
              {instances
                .filter(instance => filter === "all" || instance.type === filter)
                .map(instance => (
                  <InstanceCard key={instance.id} instance={instance} />
                ))}
            </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <CreateScenarioModal
        isOpen={isOpen}
        onClose={onClose}
        selectedTemplate={selectedTemplate}
      />
    </Box>
  )
} 