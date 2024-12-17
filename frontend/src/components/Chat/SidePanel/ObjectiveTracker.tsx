import React from "react"
import {
  Box,
  Button,
  Checkbox,
  Flex,
  IconButton,
  Progress,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { FiPlus, FiTrash2 } from "react-icons/fi"
import { useI18n } from "../../../hooks/useI18n"

// TODO: Replace with actual objectives data from context/store
const mockObjectives = [
  {
    id: "1",
    title: "Understand user requirements",
    completed: true,
  },
  {
    id: "2",
    title: "Provide solution options",
    completed: false,
  },
  {
    id: "3",
    title: "Implement chosen solution",
    completed: false,
  },
]

const ObjectiveTracker: React.FC = () => {
  const { t } = useI18n()
  const borderColor = useColorModeValue("gray.200", "gray.700")
  
  const completedCount = mockObjectives.filter(obj => obj.completed).length
  const progress = (completedCount / mockObjectives.length) * 100

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontWeight="medium">
          {t('chat.objectives.progress')}
        </Text>
        <Button
          size="sm"
          leftIcon={<FiPlus />}
          variant="ghost"
        >
          {t('chat.objectives.add')}
        </Button>
      </Flex>

      <Progress
        value={progress}
        size="sm"
        colorScheme="blue"
        mb={4}
        borderRadius="full"
      />

      <Flex direction="column" gap={2}>
        {mockObjectives.map((objective) => (
          <Flex
            key={objective.id}
            p={2}
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="md"
            justify="space-between"
            align="center"
          >
            <Checkbox
              isChecked={objective.completed}
              colorScheme="blue"
            >
              <Text fontSize="sm">{objective.title}</Text>
            </Checkbox>
            
            <IconButton
              aria-label={t('chat.objectives.remove')}
              icon={<FiTrash2 />}
              size="sm"
              variant="ghost"
            />
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}

export default ObjectiveTracker 