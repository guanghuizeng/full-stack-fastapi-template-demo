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
  Divider,
} from "@chakra-ui/react"
import { 
  FiArrowUp, 
  FiArrowDown, 
  FiMessageSquare, 
  FiBookmark,
  FiThumbsUp,
  FiThumbsDown,
  FiTrendingUp,
  FiUsers,
  FiClock,
} from "react-icons/fi"
import { useRedditAnalysis } from "../../hooks/useRedditAnalysis"

// Mock data
const mockPosts = [
  {
    id: '1',
    title: 'Introducing React 18: The Latest Features and Improvements',
    author: 'react_team',
    subreddit: 'programming',
    score: 2100,
    comments: 234,
    created: '2 hours ago',
    content: 'React 18 brings exciting new features including automatic batching, new APIs, and streaming server-side rendering...',
    sentiment: {
      score: 0.85,
      label: 'Positive',
    },
    keywords: ['React', 'JavaScript', 'Web Development', 'Frontend'],
    similar: [
      { title: 'React 18 RC Now Available', score: 0.85 },
      { title: 'Understanding React 18 Features', score: 0.82 },
    ],
  },
  {
    id: '2',
    title: 'The Future of Web Development: What to Expect in 2024',
    author: 'tech_expert',
    subreddit: 'webdev',
    score: 1800,
    comments: 156,
    created: '4 hours ago',
    content: 'As we look ahead to 2024, several emerging trends are shaping the future of web development...',
    sentiment: {
      score: 0.75,
      label: 'Positive',
    },
    keywords: ['Web Development', 'Trends', 'Technology', 'Future'],
    similar: [
      { title: 'Web Development Trends 2024', score: 0.88 },
      { title: 'Future of Frontend Development', score: 0.78 },
    ],
  },
]

interface PostCardProps {
  post: typeof mockPosts[0]
  isSelected: boolean
  onSelect: () => void
  isSaved: boolean
  onToggleSave: () => void
}

const PostCard = ({
  post,
  isSelected,
  onSelect,
  isSaved,
  onToggleSave,
}: PostCardProps) => {
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
          <Heading size="sm">{post.title}</Heading>
          
          <HStack spacing={4}>
            <HStack>
              <Icon as={FiArrowUp} />
              <Text fontWeight="bold">{post.score}</Text>
              <Icon as={FiArrowDown} />
            </HStack>
            
            <HStack>
              <Icon as={FiMessageSquare} />
              <Text>{post.comments}</Text>
            </HStack>
            
            <Text color="gray.500">{post.created}</Text>
          </HStack>
          
          <HStack>
            <Text color="gray.500">in r/{post.subreddit}</Text>
            <Text color="gray.500">by u/{post.author}</Text>
          </HStack>
          
          <Text noOfLines={2}>{post.content}</Text>
          
          <Button
            size="sm"
            variant={isSaved ? "solid" : "ghost"}
            colorScheme="blue"
            leftIcon={<Icon as={FiBookmark} />}
            onClick={(e) => {
              e.stopPropagation()
              onToggleSave()
            }}
          >
            {isSaved ? 'Saved' : 'Save'}
          </Button>
        </VStack>
      </CardBody>
    </Card>
  )
}

const PostAnalysis = () => {
  const bg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.600")

  const selectedPost = mockPosts[0] // For demo

  if (!selectedPost) {
    return (
      <Card>
        <CardBody>
          <Text>Select a post to view analysis</Text>
        </CardBody>
      </Card>
    )
  }

  return (
    <Box>
      <Grid templateColumns="1fr" gap={4}>
        {/* Sentiment Analysis */}
        <Card bg={bg} borderColor={borderColor} borderWidth="1px">
          <CardBody>
            <Text fontWeight="bold" mb={4}>Sentiment Analysis</Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              <Stat>
                <HStack color="green.500" mb={2}>
                  <Icon as={FiThumbsUp} />
                  <StatLabel>Sentiment</StatLabel>
                </HStack>
                <StatNumber>{selectedPost.sentiment.score * 100}%</StatNumber>
                <StatHelpText>{selectedPost.sentiment.label}</StatHelpText>
              </Stat>
              
              <Stat>
                <HStack color="blue.500" mb={2}>
                  <Icon as={FiTrendingUp} />
                  <StatLabel>Engagement</StatLabel>
                </HStack>
                <StatNumber>High</StatNumber>
                <StatHelpText>Based on activity</StatHelpText>
              </Stat>
              
              <Stat>
                <HStack color="purple.500" mb={2}>
                  <Icon as={FiUsers} />
                  <StatLabel>Reach</StatLabel>
                </HStack>
                <StatNumber>5.2k</StatNumber>
                <StatHelpText>Unique views</StatHelpText>
              </Stat>
            </Grid>
          </CardBody>
        </Card>

        {/* Keywords */}
        <Card bg={bg} borderColor={borderColor} borderWidth="1px">
          <CardBody>
            <Text fontWeight="bold" mb={4}>Keywords</Text>
            <HStack spacing={2} flexWrap="wrap">
              {selectedPost.keywords.map((keyword) => (
                <Tag key={keyword} colorScheme="blue" mb={2}>
                  {keyword}
                </Tag>
              ))}
            </HStack>
          </CardBody>
        </Card>

        {/* Similar Posts */}
        <Card bg={bg} borderColor={borderColor} borderWidth="1px">
          <CardBody>
            <Text fontWeight="bold" mb={4}>Similar Posts</Text>
            <List spacing={3}>
              {selectedPost.similar.map((post) => (
                <ListItem key={post.title}>
                  <HStack justify="space-between">
                    <Text>{post.title}</Text>
                    <Tag colorScheme="green">{(post.score * 100).toFixed(0)}% Match</Tag>
                  </HStack>
                  <Divider mt={2} />
                </ListItem>
              ))}
            </List>
          </CardBody>
        </Card>
      </Grid>
    </Box>
  )
}

export default function PostView() {
  const { selectedPost, setSelectedPost, savedPosts, toggleSavePost } = useRedditAnalysis()

  return (
    <Grid templateColumns="400px 1fr" gap={4}>
      <Box>
        {mockPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            isSelected={selectedPost === post.id}
            onSelect={() => setSelectedPost(post.id)}
            isSaved={savedPosts.includes(post.id)}
            onToggleSave={() => toggleSavePost(post.id)}
          />
        ))}
      </Box>
      
      <PostAnalysis />
    </Grid>
  )
} 