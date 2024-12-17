import React, { lazy, Suspense } from "react"
import {
  Box,
  Circle,
  Flex,
  Text,
  VStack,
  Heading,
  List,
  ListItem,
  ListIcon,
  HStack,
  Tag,
  Icon,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react"
import { FiCheck, FiCpu } from "react-icons/fi"
import { useI18n } from "../../../hooks/useI18n"
import { useAgentChat, type Message } from "../../../hooks/useAgentChat"

// Lazy load components
const MessageList = lazy(() => import("./MessageList"))
const VirtualScroller = lazy(() => import("./VirtualScroller"))

interface ChatAreaProps {
  onMessageAction: (action: string, message: any) => void
}

const ChatArea: React.FC<ChatAreaProps> = ({ onMessageAction }) => {
  const { t } = useI18n()
  const bg = useColorModeValue("gray.50", "gray.900")
  const agentAvatarBg = useColorModeValue("teal.500", "teal.400")
  const iconColor = useColorModeValue("white", "gray.800")
  const { messages, isLoading, currentAgent } = useAgentChat()

  // 定义特征数组
  const traits = [
    t('chat.greeting.persona.traits.0'),
    t('chat.greeting.persona.traits.1'),
    t('chat.greeting.persona.traits.2'),
  ]

  return (
    <Box
      flex="1"
      bg={bg}
      overflow="hidden"
      position="relative"
    >
      {messages.length === 0 ? (
        <Flex
          h="100%"
          justify="center"
          align="center"
          direction="column"
          gap={4}
          color="gray.500"
          p={8}
        >
          <VStack spacing={6} maxW="600px" textAlign="center">
            <Heading size="lg" color="blue.500">
              {t('chat.greeting.welcome')}
            </Heading>

            <VStack spacing={4}>
              <Circle
                size="96px"
                bg={agentAvatarBg}
                shadow="lg"
                position="relative"
              >
                <Icon
                  as={FiCpu}
                  color={iconColor}
                  boxSize="48px"
                />
                <Circle
                  size="24px"
                  bg="green.500"
                  border="2px solid"
                  borderColor={useColorModeValue("white", "gray.800")}
                  position="absolute"
                  bottom="0"
                  right="0"
                />
              </Circle>
              <VStack spacing={2}>
                <Heading size="md" color="gray.700">
                  {currentAgent.name}
                </Heading>
                <HStack>
                  <Tag colorScheme="green">
                    {t(`simulation.agents.types.${currentAgent.type}`)}
                  </Tag>
                  <Tag colorScheme="blue">
                    {t(`simulation.agents.experienceLevels.${currentAgent.experience}`)}
                  </Tag>
                </HStack>
              </VStack>
            </VStack>

            <Text fontSize="lg" color="gray.600">
              {currentAgent.description}
            </Text>
            
            <List spacing={3} textAlign="left" w="full">
              {traits.map((trait, index) => (
                <ListItem key={index} display="flex" alignItems="center">
                  <ListIcon as={FiCheck} color="green.500" />
                  <Text color="gray.600">{trait}</Text>
                </ListItem>
              ))}
            </List>

            <VStack spacing={3} mt={4}>
              <Text fontWeight="medium">{t('chat.greeting.suggestions.title')}</Text>
              <List spacing={2} textAlign="left" w="full">
                <ListItem>• {t('chat.greeting.suggestions.item1')}</ListItem>
                <ListItem>• {t('chat.greeting.suggestions.item2')}</ListItem>
                <ListItem>• {t('chat.greeting.suggestions.item3')}</ListItem>
              </List>
            </VStack>
          </VStack>
        </Flex>
      ) : (
        <Suspense fallback={
          <Flex justify="center" align="center" h="100%">
            <Spinner size="xl" color="blue.500" />
          </Flex>
        }>
          <VirtualScroller
            items={messages}
            itemHeight={100}
            overscan={5}
            onLoadMore={() => {
              // TODO: 加载更多消息
            }}
          >
            {(virtualItems: Message[]) => (
              <MessageList
                messages={virtualItems}
                isLoading={isLoading}
                onMessageAction={onMessageAction}
              />
            )}
          </VirtualScroller>
        </Suspense>
      )}
    </Box>
  )
}

export default ChatArea 