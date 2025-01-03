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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Spinner,
} from "@chakra-ui/react"
import { FiFilter, FiPlus } from "react-icons/fi"
import { useAgents, type Agent } from "../../../hooks/useAgents"
import { useI18n } from "../../../hooks/useI18n"

function AgentCard({ agent, onEdit }: { agent: Agent; onEdit: (agent: Agent) => void }) {
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
        <Icon as={agent.icon} boxSize={6} color="blue.500" />
        <Text fontSize="lg" fontWeight="bold">
          {agent.name}
        </Text>
      </HStack>

      <Text color="gray.500" mb={4} noOfLines={2}>
        {agent.description}
      </Text>

      <HStack spacing={2} mb={4} flexWrap="wrap">
        {agent.traits.map((trait: string) => (
          <Tag key={trait} size="sm" colorScheme="purple">
            {trait}
          </Tag>
        ))}
      </HStack>

      <HStack spacing={2}>
        <Tag colorScheme={agent.status === "active" ? "green" : agent.status === "ready" ? "blue" : "orange"}>
          {t(`simulation.agents.agentStatus.${agent.status}`)}
        </Tag>
        <Tag colorScheme="gray">
          {t('simulation.agents.experience')}: {t(`simulation.agents.experienceLevels.${agent.experience}`)}
        </Tag>
      </HStack>

      <HStack spacing={2} mt={4}>
        <Button
          colorScheme="blue"
          size="sm"
          onClick={() => {
            // Handle train/deploy agent
          }}
        >
          {agent.status === "training" ? t('simulation.agents.train') : t('simulation.agents.deploy')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(agent)}
        >
          {t('common.edit')}
        </Button>
      </HStack>
    </Box>
  )
}

function AgentForm({ agent, onSubmit, onClose }: { 
  agent?: Agent
  onSubmit: (data: Partial<Agent>) => void
  onClose: () => void 
}) {
  const { t } = useI18n()
  const [formData, setFormData] = useState<Partial<Agent>>({
    name: "",
    type: "persona" as const,
    description: "",
    status: "ready" as const,
    traits: [],
    experience: "beginner" as const,
    ...agent
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>{t('simulation.agents.name')}</FormLabel>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={t('simulation.agents.namePlaceholder')}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>{t('simulation.agents.type')}</FormLabel>
          <Select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as Agent["type"] })}
          >
            <option value="persona">{t('simulation.agents.types.persona')}</option>
            <option value="service">{t('simulation.agents.types.service')}</option>
            <option value="analyst">{t('simulation.agents.types.analyst')}</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>{t('simulation.agents.description')}</FormLabel>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder={t('simulation.agents.descriptionPlaceholder')}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>{t('simulation.agents.experience')}</FormLabel>
          <Select
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value as Agent["experience"] })}
          >
            <option value="beginner">{t('simulation.agents.experienceLevels.beginner')}</option>
            <option value="intermediate">{t('simulation.agents.experienceLevels.intermediate')}</option>
            <option value="advanced">{t('simulation.agents.experienceLevels.advanced')}</option>
            <option value="expert">{t('simulation.agents.experienceLevels.expert')}</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>{t('simulation.agents.traits')}</FormLabel>
          <Input
            value={(formData.traits || []).join(", ")}
            onChange={(e) => setFormData({ ...formData, traits: e.target.value.split(",").map(t => t.trim()) })}
            placeholder={t('simulation.agents.traitsPlaceholder')}
          />
        </FormControl>

        <HStack spacing={2} width="100%" justify="flex-end">
          <Button variant="ghost" onClick={onClose}>{t('common.cancel')}</Button>
          <Button type="submit" colorScheme="blue">
            {agent ? t('common.update') : t('common.create')}
          </Button>
        </HStack>
      </VStack>
    </form>
  )
}

export default function AgentsView() {
  const { t } = useI18n()
  const [filter, setFilter] = useState<string>("all")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedAgent, setSelectedAgent] = useState<Agent | undefined>()
  
  const {
    agents,
    isLoading,
    createAgent,
    updateAgent,
    isCreating,
    isUpdating,
  } = useAgents(filter)

  const handleEdit = (agent: Agent) => {
    setSelectedAgent(agent)
    onOpen()
  }

  const handleSubmit = (data: Partial<Agent>) => {
    if (selectedAgent) {
      updateAgent({ ...selectedAgent, ...data })
    } else {
      createAgent(data as Omit<Agent, "id">)
    }
  }

  const handleCreate = () => {
    setSelectedAgent(undefined)
    onOpen()
  }

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="200px">
        <Spinner size="xl" />
      </Flex>
    )
  }

  const getFilterLabel = (filter: string) => {
    if (filter === "all") return t('common.all')
    return t(`simulation.agents.agentStatus.${filter}`)
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <HStack spacing={4}>
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<Icon as={FiFilter} />}
              variant="outline"
            >
              {t('common.filter')}: {getFilterLabel(filter)}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setFilter("all")}>{t('common.all')}</MenuItem>
              <MenuItem onClick={() => setFilter("active")}>{t('simulation.agents.agentStatus.active')}</MenuItem>
              <MenuItem onClick={() => setFilter("ready")}>{t('simulation.agents.agentStatus.ready')}</MenuItem>
              <MenuItem onClick={() => setFilter("training")}>{t('simulation.agents.agentStatus.training')}</MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        <Button
          colorScheme="blue"
          leftIcon={<Icon as={FiPlus} />}
          onClick={handleCreate}
          isLoading={isCreating}
        >
          {t('simulation.agents.createAgent')}
        </Button>
      </Flex>

      <Grid
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={6}
        mb={8}
      >
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} onEdit={handleEdit} />
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedAgent ? t('simulation.agents.editAgent') : t('simulation.agents.createAgent')}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <AgentForm
              agent={selectedAgent}
              onSubmit={handleSubmit}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
} 