import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { FiBriefcase, FiHome, FiSettings, FiUsers, FiCpu } from "react-icons/fi"
import { useI18n } from "../../hooks/useI18n"

import type { UserPublic } from "../../client"

const SidebarItems = ({ onClose }: { onClose?: () => void }) => {
  const { t } = useI18n()
  const queryClient = useQueryClient()
  const textColor = useColorModeValue("ui.main", "ui.light")
  const bgActive = useColorModeValue("#E2E8F0", "#4A5568")
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])

  const items = [
    { icon: FiHome, title: t('common.dashboard'), path: "/", visible: true },
    { icon: FiBriefcase, title: "Items", path: "/items", visible: false },
    { icon: FiCpu, title: t('common.simulation'), path: "/simulation/scenarios", visible: true },
    { icon: FiSettings, title: t('common.settings'), path: "/settings", visible: true },
  ]

  const finalItems = currentUser?.is_superuser
    ? [...items, { icon: FiUsers, title: t('common.admin'), path: "/admin", visible: true }]
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
    <Box>
      <Box>{listItems}</Box>
    </Box>
  )
}

export default SidebarItems
