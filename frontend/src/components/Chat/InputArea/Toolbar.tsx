import React from "react"
import {
  Flex,
  IconButton,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react"
import {
  FiCode,
  FiImage,
  FiPaperclip,
  FiTrash2,
} from "react-icons/fi"
import { useI18n } from "../../../hooks/useI18n"

interface ToolbarProps {
  onClear?: () => void
  onUpload?: () => void
  onInsertCode?: () => void
}

const Toolbar: React.FC<ToolbarProps> = ({
  onClear,
  onUpload,
  onInsertCode,
}) => {
  const { t } = useI18n()
  const borderColor = useColorModeValue("gray.200", "gray.700")

  return (
    <Flex
      gap={1}
      py={1}
      borderBottom="1px"
      borderColor={borderColor}
    >
      <Tooltip label={t('chat.toolbar.upload')}>
        <IconButton
          aria-label={t('chat.toolbar.upload')}
          icon={<FiPaperclip />}
          variant="ghost"
          size="sm"
          onClick={onUpload}
        />
      </Tooltip>

      <Tooltip label={t('chat.toolbar.code')}>
        <IconButton
          aria-label={t('chat.toolbar.code')}
          icon={<FiCode />}
          variant="ghost"
          size="sm"
          onClick={onInsertCode}
        />
      </Tooltip>

      <Tooltip label={t('chat.toolbar.clear')}>
        <IconButton
          aria-label={t('chat.toolbar.clear')}
          icon={<FiTrash2 />}
          variant="ghost"
          size="sm"
          onClick={onClear}
        />
      </Tooltip>
    </Flex>
  )
}

export default Toolbar 