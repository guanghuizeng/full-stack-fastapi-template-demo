import {
  Box,
  Button,
  HStack,
  Icon,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { FiClock, FiUsers } from "react-icons/fi"
import { IconType } from "react-icons"

interface ScenarioCardProps {
  scenario: {
    id: string
    title: string
    icon: IconType
    description: string
    status: string
    agentCount: number
    duration: number
    type: string
  }
}

const statusColors = {
  ready: "green",
  active: "blue",
  draft: "gray",
}

export default function ScenarioCard({ scenario }: ScenarioCardProps) {
  const bg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")

  return (
    <Box
      bg={bg}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      p={4}
      _hover={{
        transform: "translateY(-2px)",
        shadow: "md",
        transition: "all 0.2s",
      }}
    >
      <HStack spacing={3} mb={3}>
        <Icon as={scenario.icon} boxSize={6} color="blue.500" />
        <Text fontSize="lg" fontWeight="bold">
          {scenario.title}
        </Text>
      </HStack>

      <Text color="gray.500" mb={4} noOfLines={2}>
        {scenario.description}
      </Text>

      <HStack spacing={4} mb={4}>
        <Tag colorScheme={statusColors[scenario.status as keyof typeof statusColors]}>
          {scenario.status.charAt(0).toUpperCase() + scenario.status.slice(1)}
        </Tag>
        <HStack spacing={1} color="gray.500">
          <Icon as={FiUsers} />
          <Text>{scenario.agentCount} agents</Text>
        </HStack>
        <HStack spacing={1} color="gray.500">
          <Icon as={FiClock} />
          <Text>{scenario.duration}m</Text>
        </HStack>
      </HStack>

      <HStack spacing={2}>
        {scenario.status === "ready" && (
          <Button
            colorScheme="blue"
            size="sm"
            onClick={() => {
              // Handle start simulation
            }}
          >
            Start
          </Button>
        )}
        {scenario.status === "active" && (
          <Button
            colorScheme="green"
            size="sm"
            onClick={() => {
              // Handle resume simulation
            }}
          >
            Resume
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            // Handle edit scenario
          }}
        >
          Edit
        </Button>
      </HStack>
    </Box>
  )
} 