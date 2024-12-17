import {
  Badge,
  Container,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  useColorMode,
} from "@chakra-ui/react"
import { useI18n } from "../../hooks/useI18n"

const Appearance = () => {
  const { t } = useI18n()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Container maxW="full">
        <Heading size="sm" py={4}>
          {t('settings.preferences.theme.title')}
        </Heading>
        <RadioGroup onChange={toggleColorMode} value={colorMode}>
          <Stack>
            <Radio value="light" colorScheme="teal">
              {t('settings.preferences.theme.light')}
              <Badge ml="1" colorScheme="teal">
                {t('common.default')}
              </Badge>
            </Radio>
            <Radio value="dark" colorScheme="teal">
              {t('settings.preferences.theme.dark')}
            </Radio>
          </Stack>
        </RadioGroup>
      </Container>
    </>
  )
}

export default Appearance
