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
          title: "Scenario created",
          description: "Your new scenario has been created successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
        onClose()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create scenario. Please try again.",
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
          Create New Scenario
          {selectedTemplate && ` from ${selectedTemplate.name}`}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter scenario name"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Type</FormLabel>
                <Select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value as any })
                  }
                  isDisabled={!!selectedTemplate}
                >
                  <option value="chat">Chat</option>
                  <option value="task">Task</option>
                  <option value="decision">Decision</option>
                  <option value="collaboration">Collaboration</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter scenario description"
                />
              </FormControl>

              <HStack spacing={2} width="100%" justify="flex-end">
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={isCreating}
                >
                  Create
                </Button>
              </HStack>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
} 