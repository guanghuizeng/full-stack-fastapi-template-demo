import {
  VStack,
  Box,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Progress,
  List,
  ListItem,
  ListIcon,
  Divider,
  Button,
  ButtonGroup,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react"
import { MdCheckCircle, MdPerson, MdAccessTime, MdTrendingUp } from "react-icons/md"
import { FiMessageSquare, FiUserPlus, FiAlertCircle } from "react-icons/fi"
import { useRedditAnalysis } from "../../hooks/useRedditAnalysis"

// Mock analysis data - 实际应用中应该从 API 获取
const mockAuthorData = {
  username: 'tech_expert',
  karma: '12.5k',
  memberSince: '2020',
  totalPosts: 156,
  avgScore: 892,
  topSubreddits: [
    { name: 'programming', percentage: 45 },
    { name: 'python', percentage: 30 },
    { name: 'coding', percentage: 15 },
  ],
  activeTimes: '8AM-4PM UTC',
  mainTopics: [
    { name: 'Web Development', percentage: 40 },
    { name: 'Python', percentage: 35 },
    { name: 'AI/ML', percentage: 25 },
  ],
  writingStyle: 'Technical',
  engagementRate: 'High',
  recentActivity: {
    lastPost: '2 hours ago',
    postFrequency: '2.3/day',
    peakActivity: 'Weekdays',
    responseRate: '85%',
  }
}

export default function AnalysisPanel() {
  const { currentView } = useRedditAnalysis()
  
  const bg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.600")
  const textColor = useColorModeValue("gray.800", "gray.100")

  if (!currentView.id) {
    return (
      <Box 
        p={4} 
        bg={bg} 
        borderRadius="md" 
        shadow="sm"
        borderColor={borderColor}
        borderWidth="1px"
      >
        <Text color="gray.500" textAlign="center">
          Select a {currentView.type} to view analysis
        </Text>
      </Box>
    )
  }

  return (
    <VStack 
      spacing={4} 
      align="stretch"
      maxH="calc(100vh - 100px)"
      overflowY="auto"
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: useColorModeValue('gray.300', 'gray.600'),
          borderRadius: '24px',
        },
      }}
    >
      {/* Current View */}
      <Box p={4} bg={bg} borderRadius="md" shadow="sm" borderColor={borderColor} borderWidth="1px">
        <Text fontWeight="bold" mb={3} color={textColor}>Current View</Text>
        <List spacing={2}>
          <ListItem>
            <HStack>
              <ListIcon as={MdPerson} color="blue.500" />
              <Text color={textColor}>Mode: Author View</Text>
            </HStack>
          </ListItem>
          <ListItem>
            <HStack>
              <ListIcon as={MdPerson} color="blue.500" />
              <Text color={textColor}>u/{mockAuthorData.username}</Text>
            </HStack>
          </ListItem>
          <ListItem>
            <HStack>
              <ListIcon as={MdTrendingUp} color="green.500" />
              <Text color={textColor}>Karma: {mockAuthorData.karma}</Text>
            </HStack>
          </ListItem>
          <ListItem>
            <HStack>
              <ListIcon as={MdAccessTime} color="purple.500" />
              <Text color={textColor}>Member since: {mockAuthorData.memberSince}</Text>
            </HStack>
          </ListItem>
        </List>
      </Box>

      {/* Author Statistics */}
      <Box p={4} bg={bg} borderRadius="md" shadow="sm" borderColor={borderColor} borderWidth="1px">
        <Text fontWeight="bold" mb={3} color={textColor}>Author Statistics</Text>
        <List spacing={3}>
          <ListItem>
            <Text color={textColor}>Total Posts: {mockAuthorData.totalPosts}</Text>
          </ListItem>
          <ListItem>
            <Text color={textColor}>Avg Score: {mockAuthorData.avgScore}</Text>
          </ListItem>
          <ListItem>
            <Text color={textColor} mb={2}>Top Subreddits:</Text>
            {mockAuthorData.topSubreddits.map((sub) => (
              <Box key={sub.name} mb={2}>
                <Text color={textColor} fontSize="sm">• r/{sub.name} ({sub.percentage}%)</Text>
                <Progress value={sub.percentage} size="sm" colorScheme="blue" />
              </Box>
            ))}
          </ListItem>
          <ListItem>
            <Text color={textColor}>Active Times: {mockAuthorData.activeTimes}</Text>
          </ListItem>
        </List>
      </Box>

      {/* Content Analysis */}
      <Box p={4} bg={bg} borderRadius="md" shadow="sm" borderColor={borderColor} borderWidth="1px">
        <Text fontWeight="bold" mb={3} color={textColor}>Content Analysis</Text>
        <List spacing={3}>
          <ListItem>
            <Text color={textColor} mb={2}>Main Topics:</Text>
            {mockAuthorData.mainTopics.map((topic) => (
              <Box key={topic.name} mb={2}>
                <Text color={textColor} fontSize="sm">• {topic.name} ({topic.percentage}%)</Text>
                <Progress value={topic.percentage} size="sm" colorScheme="green" />
              </Box>
            ))}
          </ListItem>
          <ListItem>
            <Text color={textColor}>Writing Style: {mockAuthorData.writingStyle}</Text>
          </ListItem>
          <ListItem>
            <Text color={textColor}>Engagement Rate: {mockAuthorData.engagementRate}</Text>
          </ListItem>
        </List>
      </Box>

      {/* Recent Activity */}
      <Box p={4} bg={bg} borderRadius="md" shadow="sm" borderColor={borderColor} borderWidth="1px">
        <Text fontWeight="bold" mb={3} color={textColor}>Recent Activity</Text>
        <List spacing={2}>
          <ListItem>
            <HStack>
              <ListIcon as={MdAccessTime} color="blue.500" />
              <Text color={textColor}>Last Post: {mockAuthorData.recentActivity.lastPost}</Text>
            </HStack>
          </ListItem>
          <ListItem>
            <HStack>
              <ListIcon as={MdTrendingUp} color="green.500" />
              <Text color={textColor}>Post Frequency: {mockAuthorData.recentActivity.postFrequency}</Text>
            </HStack>
          </ListItem>
          <ListItem>
            <HStack>
              <ListIcon as={MdAccessTime} color="purple.500" />
              <Text color={textColor}>Peak Activity: {mockAuthorData.recentActivity.peakActivity}</Text>
            </HStack>
          </ListItem>
          <ListItem>
            <HStack>
              <ListIcon as={FiMessageSquare} color="orange.500" />
              <Text color={textColor}>Response Rate: {mockAuthorData.recentActivity.responseRate}</Text>
            </HStack>
          </ListItem>
        </List>
      </Box>

      {/* Interaction Options */}
      <Box p={4} bg={bg} borderRadius="md" shadow="sm" borderColor={borderColor} borderWidth="1px">
        <Text fontWeight="bold" mb={3} color={textColor}>Interaction Options</Text>
        <ButtonGroup spacing={4} width="100%">
          <Button leftIcon={<FiUserPlus />} colorScheme="blue" flex={1}>
            Follow
          </Button>
          <Button leftIcon={<FiMessageSquare />} colorScheme="green" flex={1}>
            Message
          </Button>
          <Button leftIcon={<FiAlertCircle />} colorScheme="red" flex={1}>
            Block
          </Button>
        </ButtonGroup>
      </Box>
    </VStack>
  )
} 