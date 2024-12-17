import React from "react"
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { useI18n } from "../../../hooks/useI18n"

// TODO: Replace with actual agent data from context/store
const mockAgent = {
  id: "1",
  name: "AI Assistant",
  avatar: "",
  status: "online",
  type: "persona",
  experience: "expert",
}

const AgentInfo: React.FC = () => {
  const { t } = useI18n()
  const statusColor = mockAgent.status === "online" ? "green" : "gray"

  return (
    <Flex gap={4} align="center">
      <Avatar
        size="lg"
        name={mockAgent.name}
        src={mockAgent.avatar}
      />
      
      <Box flex="1">
        <Heading size="sm" mb={1}>
          {mockAgent.name}
        </Heading>
        
        <Flex gap={2} mb={2}>
          <Tag size="sm" colorScheme={statusColor}>
            {t(`chat.status.${mockAgent.status}`)}
          </Tag>
          <Tag size="sm">
            {t(`simulation.agents.types.${mockAgent.type}`)}
          </Tag>
          <Tag size="sm">
            {t(`simulation.agents.experienceLevels.${mockAgent.experience}`)}
          </Tag>
        </Flex>
      </Box>
    </Flex>
  )
}

export default AgentInfo 