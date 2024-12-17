import React from "react"
import {
  Box,
  Circle,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react"
import { useI18n } from "../../../hooks/useI18n"
import { FiCopy, FiEdit2, FiMoreHorizontal, FiRepeat, FiUser, FiCpu } from "react-icons/fi"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { Message } from "../../../hooks/useAgentChat"

interface MessageGroupProps {
  date: string
  messages: Message[]
  onAction: (action: string, message: Message) => void
}

const MessageGroup: React.FC<MessageGroupProps> = ({ date, messages, onAction }) => {
  const { t } = useI18n()
  const userBg = useColorModeValue("blue.50", "blue.900")
  const agentBg = useColorModeValue("gray.50", "gray.700")
  const codeBg = useColorModeValue("gray.50", "gray.800")
  const userAvatarBg = useColorModeValue("blue.500", "blue.400")
  const agentAvatarBg = useColorModeValue("teal.500", "teal.400")
  const iconColor = useColorModeValue("white", "gray.800")

  const renderContent = (message: Message) => {
    switch (message.type) {
      case 'code':
        return (
          <Box position="relative">
            <Box
              position="absolute"
              top={2}
              right={2}
              zIndex={1}
            >
              <IconButton
                aria-label={t('chat.messageActions.copy')}
                icon={<FiCopy />}
                size="sm"
                onClick={() => onAction('copy', message)}
              />
            </Box>
            <SyntaxHighlighter
              language={message.language || 'typescript'}
              style={tomorrow}
              customStyle={{
                margin: 0,
                borderRadius: '0.375rem',
                padding: '1rem',
              }}
            >
              {message.content}
            </SyntaxHighlighter>
          </Box>
        )
      case 'image':
        return (
          <Image
            src={message.content}
            alt="Message attachment"
            maxH="300px"
            borderRadius="md"
          />
        )
      default:
        return (
          <Text whiteSpace="pre-wrap">
            {message.content}
          </Text>
        )
    }
  }

  return (
    <Box>
      <Text
        fontSize="sm"
        color="gray.500"
        textAlign="center"
        my={4}
      >
        {date}
      </Text>

      {messages.map((message) => (
        <Flex
          key={message.id}
          mb={4}
          flexDirection={message.sender.isAgent ? "row" : "row-reverse"}
        >
          <Circle
            size="40px"
            bg={message.sender.isAgent ? agentAvatarBg : userAvatarBg}
            mr={message.sender.isAgent ? 2 : 0}
            ml={message.sender.isAgent ? 0 : 2}
            position="relative"
          >
            <Icon
              as={message.sender.isAgent ? FiCpu : FiUser}
              color={iconColor}
              boxSize="20px"
            />
            <Circle
              size="12px"
              bg={message.sender.isAgent ? "green.500" : "blue.500"}
              border="2px solid"
              borderColor={useColorModeValue("white", "gray.800")}
              position="absolute"
              bottom="0"
              right="0"
            />
          </Circle>
          
          <Box maxW="70%">
            {message.replyTo && (
              <Box
                ml={4}
                mb={2}
                p={2}
                borderLeftWidth={2}
                borderColor="blue.500"
                bg={useColorModeValue("gray.50", "gray.700")}
                borderRadius="md"
              >
                <Text fontSize="sm" color="gray.500">
                  {message.replyTo.sender.name}
                </Text>
                <Text fontSize="sm" noOfLines={2}>
                  {message.replyTo.content}
                </Text>
              </Box>
            )}

            <Box
              bg={message.sender.isAgent ? agentBg : userBg}
              px={4}
              py={2}
              borderRadius="lg"
              position="relative"
            >
              <Flex justify="space-between" align="center" mb={1}>
                <Text fontSize="sm" color="gray.500">
                  {message.sender.name}
                </Text>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<FiMoreHorizontal />}
                    variant="ghost"
                    size="xs"
                  />
                  <MenuList>
                    <MenuItem
                      icon={<FiCopy />}
                      onClick={() => onAction('copy', message)}
                    >
                      {t('chat.messageActions.copy')}
                    </MenuItem>
                    <MenuItem
                      icon={<FiRepeat />}
                      onClick={() => onAction('quote', message)}
                    >
                      {t('chat.messageActions.quote')}
                    </MenuItem>
                    {!message.sender.isAgent && (
                      <MenuItem
                        icon={<FiEdit2 />}
                        onClick={() => onAction('edit', message)}
                      >
                        {t('chat.messageActions.edit')}
                      </MenuItem>
                    )}
                  </MenuList>
                </Menu>
              </Flex>

              {renderContent(message)}

              <Text fontSize="xs" color="gray.500" textAlign="right" mt={1}>
                {new Date(message.timestamp).toLocaleTimeString()}
                {message.status && (
                  <Text as="span" ml={2}>
                    · {t(`chat.status.${message.status}`)}
                  </Text>
                )}
              </Text>
            </Box>
          </Box>
        </Flex>
      ))}
    </Box>
  )
}

interface MessageListProps {
  messages: Message[]
  isLoading?: boolean
  onMessageAction: (action: string, message: Message) => void
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  isLoading,
  onMessageAction,
}) => {
  const { t } = useI18n()

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = new Date(message.timestamp).toLocaleDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(message)
    return groups
  }, {} as Record<string, Message[]>)

  return (
    <Box px={4} py={2}>
      {Object.entries(groupedMessages).map(([date, messages]) => (
        <MessageGroup
          key={date}
          date={date}
          messages={messages}
          onAction={onMessageAction}
        />
      ))}
      
      {isLoading && (
        <Text textAlign="center" color="gray.500">
          {t('common.loading')}
        </Text>
      )}
    </Box>
  )
}

export default MessageList 