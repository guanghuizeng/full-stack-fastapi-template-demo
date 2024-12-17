import React, { useState } from "react"
import {
  Box,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react"
import ChatHeader from "./ChatHeader"
import ChatArea from "./ChatArea"
import InputArea from "./InputArea"
import SidePanel from "./SidePanel"
import { useI18n } from "../../hooks/useI18n"
import { useAgentChat } from "../../hooks/useAgentChat"

const ChatView: React.FC = () => {
  const { t } = useI18n()
  const bg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const { sendMessage } = useAgentChat()

  const handleSend = (content: string, type: 'text' | 'code' | 'image') => {
    sendMessage(content)
  }

  const handleMessageAction = (action: string, message: any) => {
    switch (action) {
      case 'copy':
        navigator.clipboard.writeText(message.content)
        break
      case 'edit':
        // TODO: Implement edit functionality
        break
      case 'quote':
        // TODO: Implement quote functionality
        break
      default:
        break
    }
  }

  return (
    <Flex h="100%" overflow="hidden">
      {/* 主对话区域 */}
      <Box
        flex="1"
        bg={bg}
        borderRight="1px"
        borderColor={borderColor}
        display="flex"
        flexDirection="column"
      >
        {/* 顶部标题栏 */}
        <ChatHeader />

        {/* 消息列表区域 */}
        <ChatArea onMessageAction={handleMessageAction} />

        {/* 输入区域 */}
        <InputArea onSend={handleSend} />
      </Box>

      {/* 右侧面板 */}
      <Box
        w="350px"
        bg={bg}
        borderLeft="1px"
        borderColor={borderColor}
        display={{ base: "none", lg: "block" }}
      >
        <SidePanel />
      </Box>
    </Flex>
  )
}

export default ChatView 