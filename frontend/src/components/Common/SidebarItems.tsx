import { Icon } from "@chakra-ui/react"
import { Link } from "@tanstack/react-router"
import {
  FiCpu,
  FiGrid,
  FiMessageSquare,
  FiSettings,
  FiUsers,
} from "react-icons/fi"

import { useI18n } from "../../hooks/useI18n"
import type { SidebarItem } from "../../types"
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react"

const SidebarItems = () => {
  const { t } = useI18n()
  const activeColor = useColorModeValue("blue.500", "blue.200")
  const hoverBg = useColorModeValue("gray.100", "gray.700")

  const items: SidebarItem[] = [
    {
      name: t('common.dashboard'),
      icon: <Icon as={FiGrid} />,
      path: "/",
    },
    {
      name: t('common.chat'),
      icon: <Icon as={FiMessageSquare} />,
      path: "/chat",
    },
    {
      name: t('common.simulation'),
      icon: <Icon as={FiCpu} />,
      path: "/simulation/scenarios",
    },
    {
      name: t('common.settings'),
      icon: <Icon as={FiSettings} />,
      path: "/settings",
    },
    {
      name: t('common.admin'),
      icon: <Icon as={FiUsers} />,
      path: "/admin",
      adminOnly: true,
    },
  ]

  return (
    <Flex direction="column" gap={1}>
      {items.map((item) => (
        <Box
          key={item.path}
          as={Link}
          to={item.path}
          p={3}
          borderRadius="md"
          _hover={{ bg: hoverBg }}
          _activeLink={{ color: activeColor, bg: hoverBg }}
        >
          <Flex align="center" gap={3}>
            {item.icon}
            <Text>{item.name}</Text>
          </Flex>
        </Box>
      ))}
    </Flex>
  )
}

export default SidebarItems
