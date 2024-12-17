import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"
import { type SubmitHandler, useForm } from "react-hook-form"

import { type ApiError, type UpdatePassword, UsersService } from "../../client"
import useCustomToast from "../../hooks/useCustomToast"
import { useI18n } from "../../hooks/useI18n"

interface UpdatePasswordForm extends UpdatePassword {
  confirm_password: string
}

const ChangePassword = () => {
  const { t } = useI18n()
  const color = useColorModeValue("inherit", "ui.light")
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordForm>({
    mode: "onBlur",
    criteriaMode: "all",
  })

  const passwordRules = () => ({
    required: t('settings.security.password.required'),
    minLength: {
      value: 8,
      message: t('settings.security.password.minLength')
    },
    validate: {
      hasNumber: (value: string) =>
        /\d/.test(value) || t('settings.security.password.needNumber'),
      hasLetter: (value: string) =>
        /[a-zA-Z]/.test(value) || t('settings.security.password.needLetter'),
      hasSpecial: (value: string) =>
        /[!@#$%^&*(),.?":{}|<>]/.test(value) || t('settings.security.password.needSpecial')
    }
  })

  const confirmPasswordRules = () => ({
    required: t('settings.security.password.confirmRequired'),
    validate: (value: string) =>
      value === getValues().new_password || t('settings.security.password.mismatch')
  })

  const mutation = useMutation({
    mutationFn: (data: UpdatePassword) =>
      UsersService.updatePasswordMe({ requestBody: data }),
    onSuccess: () => {
      showToast(t('common.success'), t('settings.security.password.updateSuccess'), "success")
      reset()
    },
    onError: (err: ApiError) => {
      handleError(err, showToast)
    },
  })

  const onSubmit: SubmitHandler<UpdatePasswordForm> = async (data) => {
    mutation.mutate(data)
  }

  return (
    <>
      <Container maxW="full">
        <Heading size="sm" py={4}>
          {t('settings.security.password.title')}
        </Heading>
        <Box
          w={{ sm: "full", md: "50%" }}
          as="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl isRequired isInvalid={!!errors.current_password}>
            <FormLabel color={color} htmlFor="current_password">
              {t('settings.security.password.current')}
            </FormLabel>
            <Input
              id="current_password"
              {...register("current_password", { required: t('settings.security.password.currentRequired') })}
              placeholder={t('settings.security.password.current')}
              type="password"
              w="auto"
            />
            {errors.current_password && (
              <FormErrorMessage>
                {errors.current_password.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl mt={4} isRequired isInvalid={!!errors.new_password}>
            <FormLabel htmlFor="password">{t('settings.security.password.new')}</FormLabel>
            <Input
              id="password"
              {...register("new_password", passwordRules())}
              placeholder={t('settings.security.password.new')}
              type="password"
              w="auto"
            />
            {errors.new_password && (
              <FormErrorMessage>{errors.new_password.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl mt={4} isRequired isInvalid={!!errors.confirm_password}>
            <FormLabel htmlFor="confirm_password">{t('settings.security.password.confirm')}</FormLabel>
            <Input
              id="confirm_password"
              {...register("confirm_password", confirmPasswordRules())}
              placeholder={t('settings.security.password.confirm')}
              type="password"
              w="auto"
            />
            {errors.confirm_password && (
              <FormErrorMessage>
                {errors.confirm_password.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <Text mt={4} fontSize="sm" color="gray.500">
            {t('settings.security.password.requirements')}
          </Text>
          <Button
            variant="primary"
            mt={4}
            type="submit"
            isLoading={isSubmitting}
          >
            {t('common.save')}
          </Button>
        </Box>
      </Container>
    </>
  )
}

export default ChangePassword
