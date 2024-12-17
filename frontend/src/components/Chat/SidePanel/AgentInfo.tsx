import React from "react"
import {
  Box,
  Circle,
  Flex,
  Heading,
  Tag,
  Text,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react"
import { FiCpu } from "react-icons/fi"
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
  const agentAvatarBg = useColorModeValue("teal.500", "teal.400")
  const iconColor = useColorModeValue("white", "gray.800")

  return (
    <Flex gap={4} align="center">
      <Circle
        size="48px"
        bg={agentAvatarBg}
        position="relative"
      >
        <Icon
          as={FiCpu}
          color={iconColor}
          boxSize="24px"
        />
        <Circle
          size="12px"
          bg={`${statusColor}.500`}
          border="2px solid"
          borderColor={useColorModeValue("white", "gray.800")}
          position="absolute"
          bottom="0"
          right="0"
        />
      </Circle>
      
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