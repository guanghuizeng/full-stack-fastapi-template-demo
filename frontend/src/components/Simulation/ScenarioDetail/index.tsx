import { useState } from "react"
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  VStack,
  Icon,
  Text,
  useColorModeValue,
  Tag,
  Divider,
  Input,
  Avatar,
  AvatarBadge,
  Progress,
  Heading,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react"
import {
  FiMessageSquare,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiSend,
} from "react-icons/fi"
import { useScenarios, type ScenarioInstance } from "../../../hooks/useScenarios"
import { useAgentChat, type Message } from "../../../hooks/useAgentChat"
import { useI18n } from "../../../hooks/useI18n"

interface ChatMessageProps {
  message: Message;
}

function ChatMessage({ message }: ChatMessageProps) {
  const isUser = !message.sender.isAgent
  const bg = useColorModeValue(
    isUser ? "blue.50" : "gray.50",
    isUser ? "blue.900" : "gray.700"
  )
  const align = isUser ? "flex-end" : "flex-start"
  const borderRadius = isUser
    ? "20px 20px 5px 20px"
    : "20px 20px 20px 5px"

  return (
    <HStack
      alignSelf={align}
      spacing={2}
      maxW="80%"
    >
      {!isUser && (
        <Avatar size="sm">
          <AvatarBadge boxSize="1.25em" bg={!message.sender.isAgent ? "green.500" : "blue.500"} />
        </Avatar>
      )}
      <Box
        bg={bg}
        p={3}
        borderRadius={borderRadius}
        maxW="100%"
      >
        <Text>{message.content}</Text>
      </Box>
      {isUser && (
        <Avatar size="sm">
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar>
      )}
    </HStack>
  )
}

interface ChatViewProps {
  instance: ScenarioInstance;
}

function ChatView({ instance }: ChatViewProps) {
  const { t } = useI18n()
  const [input, setInput] = useState("")
  const { messages, sendMessage, isLoading } = useAgentChat()

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim())
      setInput("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Box h="600px" display="flex" flexDirection="column">
      <VStack
        flex={1}
        spacing={4}
        overflowY="auto"
        alignItems="stretch"
        p={4}
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </VStack>

      <Box p={4} borderTop="1px" borderColor="gray.200">
        <HStack>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('simulation.scenarios.chat.inputPlaceholder')}
            size="lg"
          />
          <Button
            colorScheme="blue"
            onClick={handleSend}
            isLoading={isLoading}
            leftIcon={<Icon as={FiSend} />}
            size="lg"
          >
            {t('simulation.scenarios.chat.send')}
          </Button>
        </HStack>
      </Box>
    </Box>
  )
}

interface ObjectivesViewProps {
  instance: ScenarioInstance;
}

function ObjectivesView({ instance }: ObjectivesViewProps) {
  return (
    <Box>
      <Heading size="md" mb={4}>Objectives</Heading>
      <List spacing={3}>
        {instance.results?.objectives.map((objective) => (
          <ListItem key={objective.id}>
            <HStack>
              <ListIcon
                as={objective.status === "completed" ? FiCheckCircle : FiClock}
                color={objective.status === "completed" ? "green.500" : "gray.500"}
              />
              <Text>{objective.description}</Text>
              <Tag
                colorScheme={
                  objective.status === "completed"
                    ? "green"
                    : objective.status === "failed"
                    ? "red"
                    : "gray"
                }
              >
                {objective.status}
              </Tag>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

interface MetricsViewProps {
  instance: ScenarioInstance;
}

function MetricsView({ instance }: MetricsViewProps) {
  return (
    <Box>
      <Heading size="md" mb={4}>Metrics</Heading>
      <VStack spacing={4} align="stretch">
        <Box>
          <HStack justify="space-between" mb={1}>
            <Text>Progress</Text>
            <Text>{instance.metrics?.progress}%</Text>
          </HStack>
          <Progress value={instance.metrics?.progress} colorScheme="blue" />
        </Box>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <Box>
            <Text color="gray.500">Success Rate</Text>
            <Text fontSize="xl" fontWeight="bold">
              {instance.metrics?.successRate}%
            </Text>
          </Box>
          <Box>
            <Text color="gray.500">Tasks Completed</Text>
            <Text fontSize="xl" fontWeight="bold">
              {instance.metrics?.completedTasks}
            </Text>
          </Box>
        </Grid>
      </VStack>
    </Box>
  )
}

export default function ScenarioDetail({ instanceId }: { instanceId: string }) {
  const { instances } = useScenarios()
  const instance = instances.find(i => i.id === instanceId)

  if (!instance) {
    return (
      <Box p={8} textAlign="center">
        <Icon as={FiAlertCircle} boxSize={8} color="red.500" mb={4} />
        <Text>Scenario not found</Text>
      </Box>
    )
  }

  return (
    <Grid templateColumns="2fr 1fr" gap={8} p={4}>
      <Box>
        <VStack spacing={6} align="stretch">
          <Box>
            <HStack mb={4}>
              <Icon
                as={FiMessageSquare}
                boxSize={6}
                color={instance.status === "active" ? "green.500" : "gray.500"}
              />
              <Heading size="lg">{instance.name}</Heading>
              <Tag
                colorScheme={instance.status === "active" ? "green" : "gray"}
                ml="auto"
              >
                {instance.status}
              </Tag>
            </HStack>
            <Text color="gray.500">{instance.description}</Text>
          </Box>

          <Divider />

          {instance.type === "chat" && <ChatView instance={instance} />}
        </VStack>
      </Box>

      <VStack spacing={8} align="stretch">
        <MetricsView instance={instance} />
        <Divider />
        <ObjectivesView instance={instance} />
      </VStack>
    </Grid>
  )
} 