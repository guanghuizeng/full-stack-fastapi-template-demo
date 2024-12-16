import React from "react"
import { Box, Container, Heading, Tab, TabList, Tabs, useColorModeValue } from "@chakra-ui/react"
import { createFileRoute, Link, Outlet } from "@tanstack/react-router"
import { useI18n } from "../../hooks/useI18n"

export const Route = createFileRoute("/_layout/simulation")({
  component: SimulationLayout,
})

function SimulationLayout() {
  const { t } = useI18n()
  const bg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")

  return (
    <Container maxW="full" p={4}>
      <Heading size="lg" mb={6}>{t('simulation.title')}</Heading>
      
      <Box 
        bg={bg} 
        borderRadius="lg" 
        borderWidth="1px"
        borderColor={borderColor}
        p={4}
      >
        <Tabs 
          variant="enclosed"
          colorScheme="blue"
        >
          <TabList mb={4}>
            <Tab as={Link} to="/simulation/scenarios">{t('simulation.scenarios.title')}</Tab>
            <Tab as={Link} to="/simulation/agents">{t('simulation.agents.title')}</Tab>
            <Tab as={Link} to="/simulation/worlds">{t('simulation.worlds.title')}</Tab>
            <Tab as={Link} to="/simulation/analysis">{t('simulation.analysis.title')}</Tab>
          </TabList>

          <Box p={4}>
            <Outlet />
          </Box>
        </Tabs>
      </Box>
    </Container>
  )
} 