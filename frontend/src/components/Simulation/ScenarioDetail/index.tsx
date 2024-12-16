import React, { useState } from "react"
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
  Textarea,
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
  FiUser,
  FiUsers,
} from "react-icons/fi"
import { useScenarios, type ScenarioInstance } from "../../../hooks/useScenarios"
import { useAgentChat, type Message } from "../../../hooks/useAgentChat"

interface ChatMessageProps {
  message: Message
}

function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender.type === "user"
  const bg = useColorModeValue(isUser ? "blue.50" : "gray.50", isUser ? "blue.800" : "gray.700")
  const align = isUser ? "flex-end" : "flex-start"

  return (
    <Box w="100%" display="flex" justifyContent={align} mb={4}>
      <HStack spacing={2} maxW="80%" alignItems="flex-start">
        <Avatar
          size="sm"
          icon={<Icon as={isUser ? FiUser : FiUsers} />}
          bg={isUser ? "blue.500" : "green.500"}
          color="white"
        >
          <AvatarBadge boxSize="1.25em" bg={message.sender.type === "user" ? "green.500" : "blue.500"} />
        </Avatar>
        <Box
          bg={bg}
          p={3}
          borderRadius="lg"
          maxW="100%"
        >
          <Text color={useColorModeValue("gray.800", "white")} fontSize="sm">
            {message.content}
          </Text>
          <Text color={useColorModeValue("gray.500", "gray.300")} fontSize="xs" mt={1}>
            {new Date(message.timestamp).toLocaleTimeString()}
          </Text>
        </Box>
      </HStack>
    </Box>
  )
}

interface ChatViewProps {
  instance: ScenarioInstance
}

function ChatView({ instance }: ChatViewProps) {
  const [message, setMessage] = useState("")
  const { conversations, sendMessage, isSending } = useAgentChat(instance.id)
  const conversation = conversations[0] // For now, just use the first conversation

  const handleSend = () => {
    if (!message.trim()) return

    sendMessage({
      conversationId: conversation.id,
      message: {
        content: message,
        sender: {
          id: "user1",
          name: "User",
          type: "user",
        },
        timestamp: new Date().toISOString(),
      },
    })
    setMessage("")
  }

  return (
    <Grid templateRows="1fr auto" height="600px" gap={4}>
      <Box
        overflowY="auto"
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        bg={useColorModeValue("white", "gray.800")}
      >
        {conversation?.messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </Box>
      <HStack spacing={2}>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          resize="none"
          rows={2}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
        />
        <Button
          colorScheme="blue"
          onClick={handleSend}
          isLoading={isSending}
          leftIcon={<Icon as={FiSend} />}
        >
          Send
        </Button>
      </HStack>
    </Grid>
  )
}

interface ObjectivesViewProps {
  instance: ScenarioInstance
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
  instance: ScenarioInstance
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