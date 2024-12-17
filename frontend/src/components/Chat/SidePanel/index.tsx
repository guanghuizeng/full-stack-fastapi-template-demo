import React from "react"
import {
  Box,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react"
import { useI18n } from "../../../hooks/useI18n"
import AgentInfo from "./AgentInfo"
import ObjectiveTracker from "./ObjectiveTracker"
import ContextPanel from "./ContextPanel"

const SidePanel: React.FC = () => {
  const { t } = useI18n()
  const borderColor = useColorModeValue("gray.200", "gray.700")

  return (
    <Box h="100%" display="flex" flexDirection="column">
      {/* 当前助手信息 */}
      <Box p={4} borderBottom="1px" borderColor={borderColor}>
        <AgentInfo />
      </Box>

      {/* 标签页面板 */}
      <Tabs flex="1" display="flex" flexDirection="column">
        <TabList px={4}>
          <Tab>{t('chat.objectives.title')}</Tab>
          <Tab>{t('chat.context.title')}</Tab>
        </TabList>

        <TabPanels flex="1" overflow="auto">
          <TabPanel>
            <ObjectiveTracker />
          </TabPanel>
          <TabPanel>
            <ContextPanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default SidePanel 