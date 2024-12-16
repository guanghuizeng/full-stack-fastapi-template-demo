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

function AgentCard({ agent, onEdit }: { agent: Agent; onEdit: (agent: Agent) => void }) {
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
          {agent.status}
        </Tag>
        <Tag colorScheme="gray">{agent.experience}</Tag>
      </HStack>

      <HStack spacing={2} mt={4}>
        <Button
          colorScheme="blue"
          size="sm"
          onClick={() => {
            // Handle train/deploy agent
          }}
        >
          {agent.status === "training" ? "Train" : "Deploy"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(agent)}
        >
          Edit
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
  const [formData, setFormData] = useState(agent || {
    name: "",
    type: "persona",
    description: "",
    status: "ready",
    traits: [],
    experience: "beginner",
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
          <FormLabel>Name</FormLabel>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Type</FormLabel>
          <Select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as Agent["type"] })}
          >
            <option value="persona">Persona</option>
            <option value="service">Service</option>
            <option value="analyst">Analyst</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Experience Level</FormLabel>
          <Select
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value as Agent["experience"] })}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Traits (comma-separated)</FormLabel>
          <Input
            value={formData.traits.join(", ")}
            onChange={(e) => setFormData({ ...formData, traits: e.target.value.split(",").map(t => t.trim()) })}
          />
        </FormControl>

        <HStack spacing={2} width="100%" justify="flex-end">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" colorScheme="blue">
            {agent ? "Update" : "Create"}
          </Button>
        </HStack>
      </VStack>
    </form>
  )
}

export default function AgentsView() {
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
              Filter: {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setFilter("all")}>All Agents</MenuItem>
              <MenuItem onClick={() => setFilter("active")}>Active</MenuItem>
              <MenuItem onClick={() => setFilter("ready")}>Ready</MenuItem>
              <MenuItem onClick={() => setFilter("training")}>Training</MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        <Button
          colorScheme="blue"
          leftIcon={<Icon as={FiPlus} />}
          onClick={handleCreate}
          isLoading={isCreating}
        >
          Create Agent
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
            {selectedAgent ? "Edit Agent" : "Create New Agent"}
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