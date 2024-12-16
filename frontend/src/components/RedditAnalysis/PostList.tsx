import {
  VStack,
  Box,
  Text,
  Card,
  CardBody,
  Stack,
  Heading,
  HStack,
  Button,
  IconButton,
  Select,
  Badge,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react"
import { useRedditAnalysis } from "../../hooks/useRedditAnalysis"
import { FiBookmark, FiUserPlus, FiArrowUp, FiArrowDown, FiMessageSquare, FiStar } from "react-icons/fi"

// Mock data - 实际应用中应该从 API 获取
const mockPosts = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  title: `Interesting Post Title ${i + 1}`,
  author: `user${i + 1}`,
  subreddit: i % 2 === 0 ? 'programming' : 'technology',
  score: Math.floor(Math.random() * 10000),
  comments: Math.floor(Math.random() * 100),
  created: `${Math.floor(Math.random() * 24)} hours ago`,
  preview: 'This is a preview of the post content...',
  isStarred: i % 5 === 0,
}))

interface PostItemProps {
  post: typeof mockPosts[0]
  isSelected: boolean
  onSelect: (postId: string) => void
  onToggleSave: (postId: string) => void
  onToggleFollow: (authorId: string) => void
  isSaved: boolean
  isFollowing: boolean
}

const PostItem = ({ 
  post, 
  isSelected, 
  onSelect, 
  onToggleSave, 
  onToggleFollow,
  isSaved,
  isFollowing,
}: PostItemProps) => {
  const bg = useColorModeValue(isSelected ? "gray.50" : "white", isSelected ? "gray.700" : "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.600")

  return (
    <Card 
      variant="outline"
      cursor="pointer"
      bg={bg}
      onClick={() => onSelect(post.id)}
      _hover={{ shadow: 'md' }}
      mb={4}
      borderColor={borderColor}
    >
      <CardBody>
        <Stack spacing={3}>
          <HStack justify="space-between" align="start">
            <Heading size="sm">
              {post.title}
              {post.isStarred && (
                <Badge ml={2} colorScheme="yellow">⭐</Badge>
              )}
            </Heading>
          </HStack>
          
          <HStack spacing={4}>
            <HStack>
              <IconButton
                aria-label="Upvote"
                icon={<FiArrowUp />}
                size="sm"
                variant="ghost"
              />
              <Text fontWeight="bold">{post.score}</Text>
              <IconButton
                aria-label="Downvote"
                icon={<FiArrowDown />}
                size="sm"
                variant="ghost"
              />
            </HStack>
            
            <HStack>
              <FiMessageSquare />
              <Text>{post.comments}</Text>
            </HStack>
            
            <Text color="gray.500">{post.created}</Text>
          </HStack>
          
          <Text color="gray.500">in r/{post.subreddit}</Text>
          
          <Text noOfLines={2}>{post.preview}</Text>
          
          <HStack spacing={2}>
            <Tooltip label={isSaved ? "Unsave Post" : "Save Post"}>
              <IconButton
                aria-label="Save post"
                icon={<FiBookmark />}
                size="sm"
                variant={isSaved ? "solid" : "ghost"}
                colorScheme={isSaved ? "blue" : "gray"}
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleSave(post.id)
                }}
              />
            </Tooltip>
            
            <Tooltip label={isFollowing ? "Unfollow Author" : "Follow Author"}>
              <IconButton
                aria-label="Follow author"
                icon={<FiUserPlus />}
                size="sm"
                variant={isFollowing ? "solid" : "ghost"}
                colorScheme={isFollowing ? "blue" : "gray"}
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleFollow(post.author)
                }}
              />
            </Tooltip>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default function PostList() {
  const { 
    selectedPost, 
    setSelectedPost,
    sortBy,
    timeRange,
    savedPosts,
    followedAuthors,
    toggleSavePost,
    toggleFollowAuthor,
  } = useRedditAnalysis()

  return (
    <Box>
      <HStack mb={4} justify="space-between">
        <HStack spacing={2}>
          <Select value={sortBy} size="sm" w="120px">
            <option value="hot">Hot</option>
            <option value="new">New</option>
            <option value="top">Top</option>
            <option value="rising">Rising</option>
          </Select>
          
          <Select value={timeRange} size="sm" w="120px">
            <option value="now">Now</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </Select>
        </HStack>

        <HStack>
          <Badge colorScheme="blue">
            <HStack spacing={1}>
              <FiBookmark />
              <Text>3</Text>
            </HStack>
          </Badge>
          <Badge colorScheme="green">
            <HStack spacing={1}>
              <FiUserPlus />
              <Text>Following 5</Text>
            </HStack>
          </Badge>
        </HStack>
      </HStack>

      <VStack spacing={0} align="stretch" maxH="calc(100vh - 200px)" overflowY="auto">
        {mockPosts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            isSelected={selectedPost === post.id}
            onSelect={setSelectedPost}
            onToggleSave={toggleSavePost}
            onToggleFollow={toggleFollowAuthor}
            isSaved={savedPosts.includes(post.id)}
            isFollowing={followedAuthors.includes(post.author)}
          />
        ))}
        
        <Button size="lg" w="100%" variant="ghost" mt={4}>
          Load More Posts
        </Button>
      </VStack>
    </Box>
  )
} 