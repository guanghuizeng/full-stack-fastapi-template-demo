import React from "react"
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { useI18n } from "../../../hooks/useI18n"
import MessageList from "./MessageList"
import VirtualScroller from "./VirtualScroller"
import { useAgentChat } from "../../../hooks/useAgentChat"

interface ChatAreaProps {
  onMessageAction: (action: string, message: any) => void
}

const ChatArea: React.FC<ChatAreaProps> = ({ onMessageAction }) => {
  const { t } = useI18n()
  const bg = useColorModeValue("gray.50", "gray.900")
  const { messages, isLoading } = useAgentChat()

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
        >
          <Text>{t('chat.noMessages')}</Text>
        </Flex>
      ) : (
        <VirtualScroller
          items={messages}
          itemHeight={100}
          overscan={5}
          onLoadMore={() => {
            // TODO: 加载更多消息
          }}
        >
          {(virtualItems) => (
            <MessageList
              messages={virtualItems}
              isLoading={isLoading}
              onMessageAction={onMessageAction}
            />
          )}
        </VirtualScroller>
      )}
    </Box>
  )
}

export default ChatArea 