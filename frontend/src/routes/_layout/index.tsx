import { Box, Container, Text, SimpleGrid, Icon, VStack, Heading, useColorModeValue } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { FiCpu, FiMessageSquare, FiSettings } from "react-icons/fi"

import useAuth from "../../hooks/useAuth"
import { useI18n } from "../../hooks/useI18n"

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {
  const { user: currentUser } = useAuth()
  const { t } = useI18n()
  const cardBg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")

  const features = [
    {
      icon: FiMessageSquare,
      title: t('common.chat'),
      description: t('chat.description'),
      path: "/chat"
    },
    {
      icon: FiCpu,
      title: t('common.simulation'),
      description: t('simulation.description'),
      path: "/simulation/scenarios"
    },
    {
      icon: FiSettings,
      title: t('common.settings'),
      description: t('settings.description'),
      path: "/settings"
    }
  ]

  return (
    <>
      <Container maxW="full">
        <Box pt={12} m={4}>
          <VStack spacing={8} align="stretch">
            <Box>
              <Text fontSize="2xl">
                Hi, {currentUser?.full_name || currentUser?.email} 👋🏼
              </Text>
              <Text>{t('dashboard.description')}</Text>
            </Box>

            <Box>
              <Heading size="md" mb={6}>{t('dashboard.features')}</Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {features.map((feature) => (
                  <Box
                    key={feature.path}
                    p={6}
                    bg={cardBg}
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor={borderColor}
                    _hover={{ 
                      transform: "translateY(-4px)",
                      boxShadow: "lg",
                      transition: "all 0.2s"
                    }}
                  >
                    <Icon as={feature.icon} boxSize={8} mb={4} color="blue.500" />
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                      {feature.title}
                    </Text>
                    <Text color="gray.500">
                      {feature.description}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          </VStack>
        </Box>
      </Container>
    </>
  )
}
