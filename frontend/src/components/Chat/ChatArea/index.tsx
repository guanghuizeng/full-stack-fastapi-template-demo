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

const ChatArea: React.FC = () => {
  const { t } = useI18n()
  const bg = useColorModeValue("gray.50", "gray.900")

  // TODO: 使用 useChat hook 获取消息数据
  const messages = []
  const isLoading = false

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
            />
          )}
        </VirtualScroller>
      )}
    </Box>
  )
}

export default ChatArea 