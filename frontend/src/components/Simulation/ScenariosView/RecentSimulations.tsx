import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tag,
  IconButton,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react"
import { FiEye, FiDownload } from "react-icons/fi"

// Mock data
const mockSimulations = [
  {
    id: "1",
    title: "Interview #12",
    status: "complete",
    date: "2024-01-16",
    duration: "45m",
  },
  {
    id: "2",
    title: "Product Test",
    status: "failed",
    date: "2024-01-15",
    duration: "15m",
  },
  {
    id: "3",
    title: "Focus Group",
    status: "complete",
    date: "2024-01-14",
    duration: "1h 30m",
  },
]

const statusColors = {
  complete: "green",
  failed: "red",
  interrupted: "yellow",
}

export default function RecentSimulations() {
  const borderColor = useColorModeValue("gray.200", "gray.700")

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Status</Th>
          <Th>Date</Th>
          <Th>Duration</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {mockSimulations.map((sim) => (
          <Tr key={sim.id} borderColor={borderColor}>
            <Td>{sim.title}</Td>
            <Td>
              <Tag
                colorScheme={
                  statusColors[sim.status as keyof typeof statusColors]
                }
              >
                {sim.status.charAt(0).toUpperCase() + sim.status.slice(1)}
              </Tag>
            </Td>
            <Td>{sim.date}</Td>
            <Td>{sim.duration}</Td>
            <Td>
              <HStack spacing={2}>
                <IconButton
                  aria-label="View simulation"
                  icon={<FiEye />}
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    // Handle view simulation
                  }}
                />
                <IconButton
                  aria-label="Download results"
                  icon={<FiDownload />}
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    // Handle download results
                  }}
                />
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
} 