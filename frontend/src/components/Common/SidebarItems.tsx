import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { FiBriefcase, FiHome, FiSettings, FiUsers, FiCpu } from "react-icons/fi"

import type { UserPublic } from "../../client"

const items = [
  { icon: FiHome, title: "Dashboard", path: "/", visible: true },
  { icon: FiBriefcase, title: "Items", path: "/items", visible: false },
  { icon: FiCpu, title: "Simulation", path: "/simulation/scenarios", visible: true },
  { icon: FiSettings, title: "User Settings", path: "/settings", visible: true },
]

interface SidebarItemsProps {
  onClose?: () => void
}

const SidebarItems = ({ onClose }: SidebarItemsProps) => {
  const queryClient = useQueryClient()
  const textColor = useColorModeValue("ui.main", "ui.light")
  const bgActive = useColorModeValue("#E2E8F0", "#4A5568")
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])

  const finalItems = currentUser?.is_superuser
    ? [...items, { icon: FiUsers, title: "Admin", path: "/admin", visible: true }]
    : items

  const listItems = finalItems
    .filter(item => item.visible)
    .map(({ icon, title, path }) => (
      <Flex
        as={Link}
        to={path}
        w="100%"
        p={2}
        key={title}
        activeProps={{
          style: {
            background: bgActive,
            borderRadius: "12px",
          },
        }}
        color={textColor}
        onClick={onClose}
      >
        <Icon as={icon} alignSelf="center" />
        <Text ml={2}>{title}</Text>
      </Flex>
    ))

  return (
    <>
      <Box>{listItems}</Box>
    </>
  )
}

export default SidebarItems
