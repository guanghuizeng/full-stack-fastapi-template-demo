import React from "react"
import { Box, Container } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import ChatView from "../../components/Chat"

export const Route = createFileRoute("/_layout/chat")({
  component: ChatLayout,
})

function ChatLayout() {
  return (
    <Container maxW="full" p={0}>
      <Box h="100vh" overflow="hidden">
        <ChatView />
      </Box>
    </Container>
  )
} 