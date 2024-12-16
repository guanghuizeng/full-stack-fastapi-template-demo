import React, { useState } from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react"
import { useScenarios, type ScenarioTemplate } from "../../../hooks/useScenarios"
import { useI18n } from "../../../hooks/useI18n"

interface CreateScenarioModalProps {
  isOpen: boolean
  onClose: () => void
  selectedTemplate?: ScenarioTemplate
}

export default function CreateScenarioModal({
  isOpen,
  onClose,
  selectedTemplate,
}: CreateScenarioModalProps) {
  const { t } = useI18n()
  const toast = useToast()
  const { createInstance, isCreating } = useScenarios()
  const [formData, setFormData] = useState({
    name: "",
    type: selectedTemplate?.type || "chat",
    description: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (selectedTemplate) {
        await createInstance({
          templateId: selectedTemplate.id,
          data: formData,
        })
        toast({
          title: t('common.success'),
          description: t('simulation.scenarios.createSuccess'),
          status: "success",
          duration: 5000,
          isClosable: true,
        })
        onClose()
      }
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('simulation.scenarios.createError'),
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {selectedTemplate 
            ? t('simulation.scenarios.createFromTemplate', { name: selectedTemplate.name })
            : t('simulation.scenarios.createScenario')
          }
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>{t('simulation.scenarios.name')}</FormLabel>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder={t('simulation.scenarios.namePlaceholder')}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>{t('simulation.scenarios.type')}</FormLabel>
                <Select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value as any })
                  }
                  isDisabled={!!selectedTemplate}
                >
                  <option value="chat">{t('simulation.scenarios.types.chat')}</option>
                  <option value="task">{t('simulation.scenarios.types.task')}</option>
                  <option value="decision">{t('simulation.scenarios.types.decision')}</option>
                  <option value="collaboration">{t('simulation.scenarios.types.collaboration')}</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>{t('simulation.scenarios.description')}</FormLabel>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder={t('simulation.scenarios.descriptionPlaceholder')}
                />
              </FormControl>

              <HStack spacing={2} width="100%" justify="flex-end">
                <Button variant="ghost" onClick={onClose}>
                  {t('common.cancel')}
                </Button>
                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={isCreating}
                >
                  {t('common.create')}
                </Button>
              </HStack>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
} 