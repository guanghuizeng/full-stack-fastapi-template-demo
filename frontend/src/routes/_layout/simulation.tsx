import React from "react"
import { Box, Container, Heading, Tab, TabList, Tabs, useColorModeValue } from "@chakra-ui/react"
import { createFileRoute, Link, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/simulation")({
  component: SimulationLayout,
})

function SimulationLayout() {
  const bg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")

  return (
    <Container maxW="full" p={4}>
      <Heading size="lg" mb={6}>AI Simulation Studio</Heading>
      
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
            <Tab as={Link} to="/simulation/scenarios">Scenarios</Tab>
            <Tab as={Link} to="/simulation/agents">Agents</Tab>
            <Tab as={Link} to="/simulation/worlds">Worlds</Tab>
            <Tab as={Link} to="/simulation/analysis">Analysis</Tab>
          </TabList>

          <Box p={4}>
            <Outlet />
          </Box>
        </Tabs>
      </Box>
    </Container>
  )
} 