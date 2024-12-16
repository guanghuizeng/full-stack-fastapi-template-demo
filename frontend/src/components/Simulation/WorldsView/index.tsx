import React, { useState } from "react"
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Progress,
  Text,
  useColorModeValue,
  VStack,
  Tag,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spinner,
} from "@chakra-ui/react"
import { FiFilter, FiPlus } from "react-icons/fi"
import { useWorlds, type World } from "../../../hooks/useWorlds"
import { useI18n } from "../../../hooks/useI18n"

function WorldCard({ world, onEdit }: { world: World; onEdit: (world: World) => void }) {
  const { t } = useI18n()
  const bg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const { startWorld, stopWorld, isStarting, isStopping } = useWorlds()

  const handleStartStop = () => {
    if (world.status === "active") {
      stopWorld(world.id)
    } else {
      startWorld(world.id)
    }
  }

  console.log(world, t('simulation.worlds.status'))

  return (
    <Box
      bg={bg}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      p={4}
      _hover={{
        transform: "translateY(-2px)",
        shadow: "md",
        transition: "all 0.2s",
      }}
    >
      <HStack spacing={3} mb={3}>
        <Icon as={world.icon} boxSize={6} color="blue.500" />
        <Text fontSize="lg" fontWeight="bold">
          {world.name}
        </Text>
      </HStack>

      <Text color="gray.500" mb={4} noOfLines={2}>
        {world.description}
      </Text>

      <VStack align="stretch" spacing={3}>
        <HStack justify="space-between">
          <Tag
            colorScheme={
              world.status === "active"
                ? "green"
                : world.status === "standby"
                ? "yellow"
                : "purple"
            }
          >
            {t(`simulation.worlds.status.${world.status}`)}
          </Tag>
        </HStack>

        <HStack justify="space-between">
          <Text fontSize="sm" color="gray.500">
            {t('simulation.worlds.complexity')}
          </Text>
          <Tag colorScheme="blue">{t(`simulation.worlds.complexityLevels.${world.complexity}`)}</Tag>
        </HStack>

        <HStack justify="space-between">
          <Text fontSize="sm" color="gray.500">
            {t('simulation.worlds.agentCount')}
          </Text>
          <Text fontSize="sm" fontWeight="medium">
            {world.agentCount}
          </Text>
        </HStack>

        <Box>
          <HStack justify="space-between" mb={1}>
            <Text fontSize="sm" color="gray.500">
              {t('simulation.worlds.resourceUsage')}
            </Text>
            <Text fontSize="sm" fontWeight="medium">
              {world.resourceUsage}%
            </Text>
          </HStack>
          <Progress
            value={world.resourceUsage}
            size="sm"
            colorScheme={
              world.resourceUsage > 80
                ? "red"
                : world.resourceUsage > 60
                ? "yellow"
                : "green"
            }
          />
        </Box>
      </VStack>

      <HStack spacing={2} mt={4}>
        <Button
          colorScheme={world.status === "active" ? "red" : "green"}
          size="sm"
          onClick={handleStartStop}
          isLoading={isStarting || isStopping}
        >
          {world.status === "active" ? t('common.stop') : t('common.start')}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(world)}
        >
          {t('simulation.worlds.configure')}
        </Button>
      </HStack>
    </Box>
  )
}

function WorldForm({ world, onSubmit, onClose }: { 
  world?: World
  onSubmit: (data: Partial<World>) => void
  onClose: () => void 
}) {
  const { t } = useI18n()
  const [formData, setFormData] = useState(world || {
    name: "",
    description: "",
    complexity: "medium",
    settings: {
      maxAgents: 10,
      timeScale: 1.0,
      environment: "default",
      constraints: [],
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>{t('common.name')}</FormLabel>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={t('simulation.worlds.namePlaceholder')}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>{t('common.description')}</FormLabel>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder={t('simulation.worlds.descriptionPlaceholder')}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>{t('simulation.worlds.complexity')}</FormLabel>
          <Select
            value={formData.complexity}
            onChange={(e) => setFormData({ ...formData, complexity: e.target.value as World["complexity"] })}
          >
            <option value="low">{t('simulation.worlds.complexityLevels.low')}</option>
            <option value="medium">{t('simulation.worlds.complexityLevels.medium')}</option>
            <option value="high">{t('simulation.worlds.complexityLevels.high')}</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>{t('simulation.worlds.maxAgents')}</FormLabel>
          <NumberInput
            value={formData.settings?.maxAgents}
            onChange={(_, value) => setFormData({
              ...formData,
              settings: { ...formData.settings!, maxAgents: value },
            })}
            min={1}
            max={100}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>{t('simulation.worlds.timeScale')}</FormLabel>
          <NumberInput
            value={formData.settings?.timeScale}
            onChange={(_, value) => setFormData({
              ...formData,
              settings: { ...formData.settings!, timeScale: value },
            })}
            min={0.1}
            max={10}
            step={0.1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>{t('simulation.worlds.environment')}</FormLabel>
          <Input
            value={formData.settings?.environment}
            onChange={(e) => setFormData({
              ...formData,
              settings: { ...formData.settings!, environment: e.target.value },
            })}
            placeholder={t('simulation.worlds.environmentPlaceholder')}
          />
        </FormControl>

        <FormControl>
          <FormLabel>{t('simulation.worlds.constraints')}</FormLabel>
          <Input
            value={formData.settings?.constraints.join(", ")}
            onChange={(e) => setFormData({
              ...formData,
              settings: {
                ...formData.settings!,
                constraints: e.target.value.split(",").map(c => c.trim()),
              },
            })}
            placeholder={t('simulation.worlds.constraintsPlaceholder')}
          />
        </FormControl>

        <HStack spacing={2} width="100%" justify="flex-end">
          <Button variant="ghost" onClick={onClose}>{t('common.cancel')}</Button>
          <Button type="submit" colorScheme="blue">
            {world ? t('common.update') : t('common.create')}
          </Button>
        </HStack>
      </VStack>
    </form>
  )
}

export default function WorldsView() {
  const { t } = useI18n()
  const [filter, setFilter] = useState<string>("all")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedWorld, setSelectedWorld] = useState<World | undefined>()
  
  const {
    worlds,
    isLoading,
    createWorld,
    updateWorld,
    isCreating,
    isUpdating,
  } = useWorlds(filter)

  const handleEdit = (world: World) => {
    setSelectedWorld(world)
    onOpen()
  }

  const handleSubmit = (data: Partial<World>) => {
    if (selectedWorld) {
      updateWorld({ ...selectedWorld, ...data })
    } else {
      createWorld(data as Omit<World, "id">)
    }
  }

  const handleCreate = () => {
    setSelectedWorld(undefined)
    onOpen()
  }

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="200px">
        <Spinner size="xl" />
      </Flex>
    )
  }

  const getFilterLabel = (filterValue: string) => {
    return filterValue === 'all' ? t('common.all') : t(`simulation.worlds.status.${filterValue}`)
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <HStack spacing={4}>
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<Icon as={FiFilter} />}
              variant="outline"
            >
              {t('common.filter')}: {getFilterLabel(filter)}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setFilter("all")}>{t('common.all')}</MenuItem>
              <MenuItem onClick={() => setFilter("active")}>{t('simulation.worlds.status.active')}</MenuItem>
              <MenuItem onClick={() => setFilter("standby")}>{t('simulation.worlds.status.standby')}</MenuItem>
              <MenuItem onClick={() => setFilter("configuring")}>{t('simulation.worlds.status.configuring')}</MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        <Button
          colorScheme="blue"
          leftIcon={<Icon as={FiPlus} />}
          onClick={handleCreate}
          isLoading={isCreating}
        >
          {t('simulation.worlds.createWorld')}
        </Button>
      </Flex>

      <Grid
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={6}
        mb={8}
      >
        {worlds.map((world) => (
          <WorldCard key={world.id} world={world} onEdit={handleEdit} />
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedWorld ? t('simulation.worlds.configureWorld') : t('simulation.worlds.createWorld')}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <WorldForm
              world={selectedWorld}
              onSubmit={handleSubmit}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
} 