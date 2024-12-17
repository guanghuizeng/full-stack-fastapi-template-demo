import React, { useCallback, useRef, useState } from "react"
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Textarea,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import {
  FiCode,
  FiImage,
  FiPaperclip,
  FiSend,
  FiSmile,
  FiType,
} from "react-icons/fi"
import { useI18n } from "../../../hooks/useI18n"
import Toolbar from "./Toolbar"

interface InputAreaProps {
  onSend: (content: string, type: 'text' | 'code' | 'image') => void
  onUpload?: (file: File) => Promise<string>
  disabled?: boolean
}

const InputArea: React.FC<InputAreaProps> = ({
  onSend,
  onUpload,
  disabled = false,
}) => {
  const { t } = useI18n()
  const [message, setMessage] = useState("")
  const [isMarkdown, setIsMarkdown] = useState(false)
  const [isCodeMode, setIsCodeMode] = useState(false)
  const [language, setLanguage] = useState("typescript")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const bg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const { isOpen: isEmojiOpen, onToggle: onEmojiToggle } = useDisclosure()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl/Cmd + Enter to send
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault()
      handleSubmit()
      return
    }

    // Tab key for indentation in code mode
    if (isCodeMode && e.key === "Tab") {
      e.preventDefault()
      const start = e.currentTarget.selectionStart
      const end = e.currentTarget.selectionEnd
      const newMessage = message.substring(0, start) + "  " + message.substring(end)
      setMessage(newMessage)
      // Move cursor after indentation
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2
        }
      }, 0)
    }
  }

  const handleSubmit = () => {
    if (!message.trim() || disabled) return

    const type = isCodeMode ? 'code' : 'text'
    onSend(message, type)
    setMessage("")
    setIsCodeMode(false)
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !onUpload) return

    try {
      const url = await onUpload(file)
      onSend(url, 'image')
    } catch (error) {
      console.error('Failed to upload file:', error)
    }
  }

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items
    const files = []

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile()
        if (file) files.push(file)
      }
    }

    if (files.length > 0 && onUpload) {
      e.preventDefault()
      try {
        const url = await onUpload(files[0])
        onSend(url, 'image')
      } catch (error) {
        console.error('Failed to upload pasted image:', error)
      }
    }
  }

  const insertText = useCallback((text: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const newMessage = message.substring(0, start) + text + message.substring(end)
    setMessage(newMessage)

    // Move cursor after inserted text
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + text.length
      textarea.focus()
    }, 0)
  }, [message])

  const toggleCodeMode = () => {
    setIsCodeMode(!isCodeMode)
    if (!isCodeMode) {
      insertText("\`\`\`" + language + "\n\n\`\`\`")
    }
  }

  return (
    <Box
      p={4}
      bg={bg}
      borderTop="1px"
      borderColor={borderColor}
    >
      <Flex direction="column" gap={2}>
        <Toolbar
          onInsertCode={toggleCodeMode}
          onClear={() => setMessage("")}
        />
        
        <Flex gap={2}>
          <Box flex="1" position="relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              placeholder={t('chat.inputPlaceholder')}
              minH="60px"
              maxH="200px"
              resize="none"
              bg={isCodeMode ? "gray.900" : undefined}
              color={isCodeMode ? "gray.100" : undefined}
              fontFamily={isCodeMode ? "mono" : undefined}
            />
            {isCodeMode && (
              <Menu>
                <MenuButton
                  as={Button}
                  size="xs"
                  position="absolute"
                  top={2}
                  right={2}
                  variant="ghost"
                >
                  {language}
                </MenuButton>
                <MenuList>
                  {["typescript", "javascript", "python", "java", "go", "rust"].map((lang) => (
                    <MenuItem
                      key={lang}
                      onClick={() => setLanguage(lang)}
                    >
                      {lang}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            )}
          </Box>
          
          <Flex direction="column" gap={2}>
            <Tooltip label={t('chat.toolbar.emoji')}>
              <IconButton
                aria-label={t('chat.toolbar.emoji')}
                icon={<FiSmile />}
                variant="ghost"
                onClick={onEmojiToggle}
              />
            </Tooltip>

            <Tooltip label={t('chat.toolbar.upload')}>
              <IconButton
                aria-label={t('chat.toolbar.upload')}
                icon={<FiPaperclip />}
                variant="ghost"
                onClick={() => fileInputRef.current?.click()}
              />
            </Tooltip>

            <Button
              colorScheme="blue"
              isDisabled={!message.trim() || disabled}
              onClick={handleSubmit}
            >
              <FiSend />
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        display="none"
      />

      {isEmojiOpen && (
        <Portal>
          <Box
            position="fixed"
            bottom="100px"
            right="100px"
            bg={bg}
            boxShadow="lg"
            borderRadius="md"
            p={4}
          >
            {/* TODO: Add emoji picker component */}
          </Box>
        </Portal>
      )}
    </Box>
  )
}

export default InputArea 