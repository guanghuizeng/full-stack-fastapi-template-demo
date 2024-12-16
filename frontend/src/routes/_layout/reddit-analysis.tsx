import { 
  Container, 
  Heading, 
  Tabs, 
  TabList, 
  Tab, 
  TabPanels, 
  TabPanel, 
  Box,
  useColorModeValue,
} from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useRedditAnalysis } from "../../hooks/useRedditAnalysis"
import FilterPanel from "../../components/RedditAnalysis/FilterPanel"
import SubredditView from "../../components/RedditAnalysis/SubredditView"
import PostView from "../../components/RedditAnalysis/PostView"
import AuthorView from "../../components/RedditAnalysis/AuthorView"
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 

ModuleRegistry.registerModules([AllCommunityModule])
export const Route = createFileRoute("/_layout/reddit-analysis")({
  component: RedditAnalysis,
})

function RedditAnalysis() {
  const { activeTab, setActiveTab } = useRedditAnalysis()

  const handleTabChange = (index: number) => {
    const tabs: Array<'subreddit' | 'post' | 'author'> = ['subreddit', 'post', 'author']
    setActiveTab(tabs[index])
  }

  const bg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.600")

  return (
    <Container maxW="full" p={4}>
      <Heading size="lg" mb={6}>Reddit Content Analyzer</Heading>
      
      <Tabs 
        index={['subreddit', 'post', 'author'].indexOf(activeTab)}
        onChange={handleTabChange}
        variant="enclosed"
        colorScheme="blue"
        isLazy
      >
        <TabList mb={4}>
          <Tab>Subreddit Analysis</Tab>
          <Tab>Post Analysis</Tab>
          <Tab>Author Analysis</Tab>
        </TabList>

        <Box 
          p={4} 
          bg={bg} 
          borderRadius="lg" 
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Box display="flex" gap={4}>
            <TabPanels flex={1}>
              <TabPanel p={0}>
                <SubredditView />
              </TabPanel>
              <TabPanel p={0}>
                <PostView />
              </TabPanel>
              <TabPanel p={0}>
                <AuthorView />
              </TabPanel>
            </TabPanels>
          </Box>
        </Box>
      </Tabs>
    </Container>
  )
} 