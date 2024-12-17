import React from "react"
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react"
import { FiMoreVertical, FiSettings } from "react-icons/fi"
import { useI18n } from "../../hooks/useI18n"

const ChatHeader: React.FC = () => {
  const { t } = useI18n()
  const bg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")

  return (
    <Box
      py={4}
      px={6}
      bg={bg}
      borderBottom="1px"
      borderColor={borderColor}
    >
      <Flex justify="space-between" align="center">
        <Heading size="md">{t('chat.title')}</Heading>
        
        <Flex gap={2}>
          <IconButton
            aria-label={t('chat.settings.title')}
            icon={<FiSettings />}
            variant="ghost"
            size="sm"
          />
          
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label={t('common.more')}
              icon={<FiMoreVertical />}
              variant="ghost"
              size="sm"
            />
            <MenuList>
              <MenuItem>{t('chat.agent.switch')}</MenuItem>
              <MenuItem>{t('chat.agent.configure')}</MenuItem>
              <MenuItem>{t('chat.objectives.title')}</MenuItem>
              <MenuItem>{t('chat.context.title')}</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  )
}

export default ChatHeader 