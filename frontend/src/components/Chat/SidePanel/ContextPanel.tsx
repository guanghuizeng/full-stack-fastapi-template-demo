import React from "react"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { useI18n } from "../../../hooks/useI18n"

// TODO: Replace with actual context data from context/store
const mockContext = {
  knowledge: [
    { id: "1", title: "Project Requirements", type: "document" },
    { id: "2", title: "Technical Specifications", type: "document" },
  ],
  reference: [
    { id: "1", title: "API Documentation", type: "link" },
    { id: "2", title: "Design Guidelines", type: "link" },
  ],
  variables: [
    { key: "PROJECT_NAME", value: "AI Chat System" },
    { key: "USER_ROLE", value: "Developer" },
  ],
}

const ContextPanel: React.FC = () => {
  const { t } = useI18n()
  const borderColor = useColorModeValue("gray.200", "gray.700")

  return (
    <Accordion allowMultiple>
      <AccordionItem border="none">
        <AccordionButton px={0}>
          <Box flex="1" textAlign="left" fontWeight="medium">
            {t('chat.context.knowledge')}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel px={0}>
          <Flex direction="column" gap={2}>
            {mockContext.knowledge.map((item) => (
              <Flex
                key={item.id}
                p={2}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="md"
                align="center"
                justify="space-between"
              >
                <Text fontSize="sm">{item.title}</Text>
                <Tag size="sm">{item.type}</Tag>
              </Flex>
            ))}
          </Flex>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="none">
        <AccordionButton px={0}>
          <Box flex="1" textAlign="left" fontWeight="medium">
            {t('chat.context.reference')}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel px={0}>
          <Flex direction="column" gap={2}>
            {mockContext.reference.map((item) => (
              <Flex
                key={item.id}
                p={2}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="md"
                align="center"
                justify="space-between"
              >
                <Text fontSize="sm">{item.title}</Text>
                <Tag size="sm">{item.type}</Tag>
              </Flex>
            ))}
          </Flex>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="none">
        <AccordionButton px={0}>
          <Box flex="1" textAlign="left" fontWeight="medium">
            {t('chat.context.variables')}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel px={0}>
          <Flex direction="column" gap={2}>
            {mockContext.variables.map((item) => (
              <Flex
                key={item.key}
                p={2}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="md"
                align="center"
                justify="space-between"
              >
                <Text fontSize="sm" fontWeight="medium">{item.key}</Text>
                <Text fontSize="sm">{item.value}</Text>
              </Flex>
            ))}
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default ContextPanel 