import {
  VStack,
  Box,
  Input,
  Select,
  Text,
  Divider,
  Checkbox,
  Stack,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Icon,
  Button,
  ButtonGroup,
} from "@chakra-ui/react"
import { FiSearch, FiBookmark, FiStar, FiUsers } from "react-icons/fi"
import { useRedditAnalysis } from "../../hooks/useRedditAnalysis"

const categories = [
  'Technology',
  'Science',
  'News',
  'Entertainment',
  'Sports',
]

export default function FilterPanel() {
  const {
    activeTab,
    searchQuery,
    sortBy,
    timeRange,
    minScore,
    categories: selectedCategories,
    bookmarkedSubreddits,
    savedPosts,
    followedAuthors,
    setSearchQuery,
    setSortBy,
    setTimeRange,
    setMinScore,
    setCategories,
  } = useRedditAnalysis()

  const bg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.600")

  // Get the appropriate saved items count based on active tab
  const getSavedItemsCount = () => {
    switch (activeTab) {
      case 'subreddit':
        return bookmarkedSubreddits.length
      case 'post':
        return savedPosts.length
      case 'author':
        return followedAuthors.length
      default:
        return 0
    }
  }

  // Get the appropriate button label based on active tab
  const getSavedItemsLabel = () => {
    switch (activeTab) {
      case 'subreddit':
        return 'Bookmarked Subreddits'
      case 'post':
        return 'Saved Posts'
      case 'author':
        return 'Followed Authors'
      default:
        return ''
    }
  }

  // Get the appropriate icon based on active tab
  const getSavedItemsIcon = () => {
    switch (activeTab) {
      case 'subreddit':
        return FiBookmark
      case 'post':
        return FiStar
      case 'author':
        return FiUsers
      default:
        return FiBookmark
    }
  }

  return (
    <Box 
      width="250px" 
      bg={bg}
      p={4}
      borderRadius="md"
      borderWidth="1px"
      borderColor={borderColor}
      height="fit-content"
    >
      {/* Saved Items Quick Access */}
      <Box mb={4}>
        <Text fontWeight="medium" mb={2}>Quick Access</Text>
        <Button
          width="full"
          leftIcon={<Icon as={getSavedItemsIcon()} />}
          colorScheme="blue"
          variant="outline"
        >
          {getSavedItemsLabel()} ({getSavedItemsCount()})
        </Button>
      </Box>

      <Divider mb={4} />

      {/* Search */}
      <Box mb={4}>
        <Text fontWeight="medium" mb={2}>Search</Text>
        <InputGroup>
          <InputLeftElement>
            <Icon as={FiSearch} color="gray.500" />
          </InputLeftElement>
          <Input
            placeholder={`Search ${activeTab}s...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
      </Box>

      <Divider mb={4} />

      {/* Sort By */}
      <Box mb={4}>
        <Text fontWeight="medium" mb={2}>Sort By</Text>
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="hot">Hot</option>
          <option value="new">New</option>
          <option value="top">Top</option>
          <option value="rising">Rising</option>
        </Select>
      </Box>

      {/* Time Range */}
      <Box mb={4}>
        <Text fontWeight="medium" mb={2}>Time Range</Text>
        <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
          <option value="hour">Past Hour</option>
          <option value="day">Past 24 Hours</option>
          <option value="week">Past Week</option>
          <option value="month">Past Month</option>
          <option value="year">Past Year</option>
          <option value="all">All Time</option>
        </Select>
      </Box>

      <Divider mb={4} />

      {/* Categories */}
      <Box mb={4}>
        <Text fontWeight="medium" mb={2}>Categories</Text>
        <Stack spacing={2}>
          {categories.map((category) => (
            <Checkbox
              key={category}
              isChecked={selectedCategories.includes(category)}
              onChange={(e) => {
                if (e.target.checked) {
                  setCategories([...selectedCategories, category])
                } else {
                  setCategories(selectedCategories.filter(c => c !== category))
                }
              }}
            >
              {category}
            </Checkbox>
          ))}
        </Stack>
      </Box>

      <Divider mb={4} />

      {/* Min Score */}
      <Box>
        <Text fontWeight="medium" mb={2}>Minimum Score</Text>
        <Text mb={2} fontSize="sm" color="gray.500">
          {minScore} points
        </Text>
        <RangeSlider
          aria-label={['min score']}
          defaultValue={[minScore]}
          min={0}
          max={10000}
          step={100}
          onChange={([value]) => setMinScore(value)}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
        </RangeSlider>
      </Box>
    </Box>
  )
} 