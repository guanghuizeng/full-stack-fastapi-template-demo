import {
  Box,
  Grid,
  Card,
  CardBody,
  Text,
  Heading,
  HStack,
  VStack,
  Button,
  Icon,
  Progress,
  List,
  ListItem,
  Tag,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  ButtonGroup,
} from "@chakra-ui/react"
import { 
  FiUser,
  FiUserPlus,
  FiMessageSquare,
  FiAlertCircle,
  FiTrendingUp,
  FiClock,
  FiStar,
} from "react-icons/fi"
import { useRedditAnalysis } from "../../hooks/useRedditAnalysis"

// Mock data
const mockAuthors = [
  {
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
  },
  {
    username: 'code_ninja',
    karma: '8.2k',
    memberSince: '2021',
    totalPosts: 98,
    avgScore: 654,
    topSubreddits: [
      { name: 'javascript', percentage: 50 },
      { name: 'reactjs', percentage: 35 },
      { name: 'webdev', percentage: 15 },
    ],
    activeTimes: '10AM-6PM UTC',
    mainTopics: [
      { name: 'JavaScript', percentage: 45 },
      { name: 'React', percentage: 40 },
      { name: 'Frontend', percentage: 15 },
    ],
    writingStyle: 'Tutorial',
    engagementRate: 'Medium',
    recentActivity: {
      lastPost: '5 hours ago',
      postFrequency: '1.8/day',
      peakActivity: 'Weekends',
      responseRate: '75%',
    }
  },
]

interface AuthorCardProps {
  author: typeof mockAuthors[0]
  isSelected: boolean
  onSelect: () => void
  isFollowing: boolean
  onToggleFollow: () => void
}

const AuthorCard = ({
  author,
  isSelected,
  onSelect,
  isFollowing,
  onToggleFollow,
}: AuthorCardProps) => {
  const bg = useColorModeValue(isSelected ? "blue.50" : "white", isSelected ? "blue.900" : "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.600")

  return (
    <Card
      cursor="pointer"
      onClick={onSelect}
      bg={bg}
      borderColor={borderColor}
      borderWidth="1px"
      _hover={{ shadow: 'md' }}
      mb={4}
    >
      <CardBody>
        <VStack align="stretch" spacing={3}>
          <HStack justify="space-between">
            <Heading size="sm">u/{author.username}</Heading>
            <Button
              size="sm"
              variant={isFollowing ? "solid" : "ghost"}
              colorScheme="blue"
              leftIcon={<Icon as={FiUserPlus} />}
              onClick={(e) => {
                e.stopPropagation()
                onToggleFollow()
              }}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
          </HStack>
          
          <HStack spacing={6}>
            <Stat size="sm">
              <StatLabel>Karma</StatLabel>
              <StatNumber>{author.karma}</StatNumber>
            </Stat>
            <Stat size="sm">
              <StatLabel>Member Since</StatLabel>
              <StatNumber>{author.memberSince}</StatNumber>
            </Stat>
          </HStack>
          
          <Text color="gray.500">
            Active in: r/{author.topSubreddits[0].name}, r/{author.topSubreddits[1].name}
          </Text>
        </VStack>
      </CardBody>
    </Card>
  )
}

const AuthorAnalysis = () => {
  const bg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.600")

  const selectedAuthor = mockAuthors[0] // For demo

  if (!selectedAuthor) {
    return (
      <Card>
        <CardBody>
          <Text>Select an author to view analysis</Text>
        </CardBody>
      </Card>
    )
  }

  return (
    <Box>
      <Grid templateColumns="1fr" gap={4}>
        {/* Overview */}
        <Card bg={bg} borderColor={borderColor} borderWidth="1px">
          <CardBody>
            <Text fontWeight="bold" mb={4}>Overview</Text>
            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
              <Stat>
                <HStack color="blue.500" mb={2}>
                  <Icon as={FiUser} />
                  <StatLabel>Total Posts</StatLabel>
                </HStack>
                <StatNumber>{selectedAuthor.totalPosts}</StatNumber>
                <StatHelpText>All time</StatHelpText>
              </Stat>
              
              <Stat>
                <HStack color="green.500" mb={2}>
                  <Icon as={FiStar} />
                  <StatLabel>Avg Score</StatLabel>
                </HStack>
                <StatNumber>{selectedAuthor.avgScore}</StatNumber>
                <StatHelpText>Per post</StatHelpText>
              </Stat>
              
              <Stat>
                <HStack color="purple.500" mb={2}>
                  <Icon as={FiTrendingUp} />
                  <StatLabel>Engagement</StatLabel>
                </HStack>
                <StatNumber>{selectedAuthor.engagementRate}</StatNumber>
                <StatHelpText>Rate</StatHelpText>
              </Stat>
              
              <Stat>
                <HStack color="orange.500" mb={2}>
                  <Icon as={FiClock} />
                  <StatLabel>Active Times</StatLabel>
                </HStack>
                <StatNumber>{selectedAuthor.activeTimes}</StatNumber>
                <StatHelpText>UTC</StatHelpText>
              </Stat>
            </Grid>
          </CardBody>
        </Card>

        {/* Top Subreddits */}
        <Card bg={bg} borderColor={borderColor} borderWidth="1px">
          <CardBody>
            <Text fontWeight="bold" mb={4}>Top Subreddits</Text>
            <List spacing={4}>
              {selectedAuthor.topSubreddits.map((sub) => (
                <ListItem key={sub.name}>
                  <Text mb={1}>r/{sub.name} ({sub.percentage}%)</Text>
                  <Progress value={sub.percentage} colorScheme="blue" />
                </ListItem>
              ))}
            </List>
          </CardBody>
        </Card>

        {/* Main Topics */}
        <Card bg={bg} borderColor={borderColor} borderWidth="1px">
          <CardBody>
            <Text fontWeight="bold" mb={4}>Main Topics</Text>
            <List spacing={4}>
              {selectedAuthor.mainTopics.map((topic) => (
                <ListItem key={topic.name}>
                  <Text mb={1}>{topic.name} ({topic.percentage}%)</Text>
                  <Progress value={topic.percentage} colorScheme="green" />
                </ListItem>
              ))}
            </List>
          </CardBody>
        </Card>

        {/* Recent Activity */}
        <Card bg={bg} borderColor={borderColor} borderWidth="1px">
          <CardBody>
            <Text fontWeight="bold" mb={4}>Recent Activity</Text>
            <List spacing={3}>
              <ListItem>
                <HStack>
                  <Icon as={FiClock} color="blue.500" />
                  <Text>Last Post: {selectedAuthor.recentActivity.lastPost}</Text>
                </HStack>
              </ListItem>
              <ListItem>
                <HStack>
                  <Icon as={FiTrendingUp} color="green.500" />
                  <Text>Post Frequency: {selectedAuthor.recentActivity.postFrequency}</Text>
                </HStack>
              </ListItem>
              <ListItem>
                <HStack>
                  <Icon as={FiClock} color="purple.500" />
                  <Text>Peak Activity: {selectedAuthor.recentActivity.peakActivity}</Text>
                </HStack>
              </ListItem>
              <ListItem>
                <HStack>
                  <Icon as={FiMessageSquare} color="orange.500" />
                  <Text>Response Rate: {selectedAuthor.recentActivity.responseRate}</Text>
                </HStack>
              </ListItem>
            </List>
          </CardBody>
        </Card>

        {/* Interaction Options */}
        <Card bg={bg} borderColor={borderColor} borderWidth="1px">
          <CardBody>
            <Text fontWeight="bold" mb={4}>Interaction Options</Text>
            <ButtonGroup spacing={4} width="100%">
              <Button leftIcon={<Icon as={FiUserPlus} />} colorScheme="blue" flex={1}>
                Follow
              </Button>
              <Button leftIcon={<Icon as={FiMessageSquare} />} colorScheme="green" flex={1}>
                Message
              </Button>
              <Button leftIcon={<Icon as={FiAlertCircle} />} colorScheme="red" flex={1}>
                Block
              </Button>
            </ButtonGroup>
          </CardBody>
        </Card>
      </Grid>
    </Box>
  )
}

export default function AuthorView() {
  const { selectedAuthor, setSelectedAuthor, followedAuthors, toggleFollowAuthor } = useRedditAnalysis()

  return (
    <Grid templateColumns="400px 1fr" gap={4}>
      <Box>
        {mockAuthors.map((author) => (
          <AuthorCard
            key={author.username}
            author={author}
            isSelected={selectedAuthor === author.username}
            onSelect={() => setSelectedAuthor(author.username)}
            isFollowing={followedAuthors.includes(author.username)}
            onToggleFollow={() => toggleFollowAuthor(author.username)}
          />
        ))}
      </Box>
      
      <AuthorAnalysis />
    </Grid>
  )
} 