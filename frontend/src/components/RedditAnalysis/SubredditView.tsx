import {
  Box,
  Grid,
  Text,
  HStack,
  Icon,
  useColorModeValue,
  Tag,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
  SimpleGrid,
  Progress,
} from "@chakra-ui/react"
import { AgGridReact } from 'ag-grid-react'
import { ColDef, ValueFormatterParams } from 'ag-grid-community'
import { FiUsers, FiMessageSquare, FiCalendar, FiBarChart2, FiLock, FiGlobe } from "react-icons/fi"
import { useRedditAnalysis } from "../../hooks/useRedditAnalysis"
import { Subreddit, SubredditAnalysis } from './typings'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import './SubredditView.css'
import { useMemo } from "react"

// Custom cell renderers and formatters
const numberFormatter = (params: ValueFormatterParams) => {
  if (typeof params.value === 'number') {
    return params.value.toLocaleString()
  }
  return params.value
}

const dateFormatter = (params: ValueFormatterParams) => {
  if (typeof params.value === 'number') {
    return new Date(params.value * 1000).toLocaleDateString()
  }
  return params.value
}

const TypeCellRenderer = (props: any) => {
  const type = props.value
  const icon = type === 'public' ? FiGlobe : FiLock
  const color = type === 'public' ? 'green' : 'orange'
  
  return (
    <HStack>
      <Icon as={icon} color={`${color}.500`} />
      <Text>{type}</Text>
    </HStack>
  )
}

const CategoryCellRenderer = (props: any) => {
  if (!props.value) return null
  return (
    <Tag colorScheme="blue" size="sm">
      {props.value}
    </Tag>
  )
}

const SubredditAnalysisPanel = ({ subreddit, analysis }: { 
  subreddit: Subreddit | null
  analysis: SubredditAnalysis | null 
}) => {
  if (!subreddit) {
    return (
      <Box p={4}>
        <Text color="gray.500">Select a subreddit to view analysis</Text>
      </Box>
    )
  }

  const numPosts = subreddit._meta?.num_posts ?? 0
  const numComments = subreddit._meta?.num_comments ?? 0
  const subscribers = subreddit.subscribers ?? 0

  return (
    <Box>
      {/* Basic Info */}
      <SimpleGrid columns={2} spacing={4} mb={6}>
        <Stat>
          <HStack color="blue.500" mb={2}>
            <Icon as={FiUsers} />
            <StatLabel>Subscribers</StatLabel>
          </HStack>
          <StatNumber>{subscribers.toLocaleString()}</StatNumber>
          <StatHelpText>Total members</StatHelpText>
        </Stat>

        <Stat>
          <HStack color="green.500" mb={2}>
            <Icon as={FiMessageSquare} />
            <StatLabel>Posts</StatLabel>
          </HStack>
          <StatNumber>{numPosts.toLocaleString()}</StatNumber>
          <StatHelpText>Total posts</StatHelpText>
        </Stat>
      </SimpleGrid>

      <Divider mb={6} />

      {/* Activity Stats */}
      {analysis && numPosts > 0 && (
        <>
          <Text fontWeight="bold" mb={4}>Activity Analysis</Text>
          <SimpleGrid columns={2} spacing={4} mb={6}>
            <Box>
              <Text mb={2}>Posts per Day</Text>
              <HStack>
                <Text>{analysis.activity.posts_per_day.toFixed(1)}</Text>
                <Progress 
                  value={analysis.activity.posts_per_day} 
                  max={100} 
                  width="100%" 
                  colorScheme="blue"
                />
              </HStack>
            </Box>

            <Box>
              <Text mb={2}>Comments per Day</Text>
              <HStack>
                <Text>{analysis.activity.comments_per_day.toFixed(1)}</Text>
                <Progress 
                  value={analysis.activity.comments_per_day} 
                  max={1000} 
                  width="100%" 
                  colorScheme="green"
                />
              </HStack>
            </Box>
          </SimpleGrid>

          <Divider mb={6} />

          {/* Content Distribution */}
          <Text fontWeight="bold" mb={4}>Content Distribution</Text>
          <SimpleGrid columns={1} spacing={4} mb={6}>
            {Object.entries(analysis.content.post_types).map(([type, count]) => (
              <Box key={type}>
                <Text mb={2}>{type}</Text>
                <HStack>
                  <Text>{((count / numPosts) * 100).toFixed(1)}%</Text>
                  <Progress 
                    value={(count / numPosts) * 100} 
                    width="100%" 
                    colorScheme="blue"
                  />
                </HStack>
              </Box>
            ))}
          </SimpleGrid>

          <Divider mb={6} />

          {/* Engagement Metrics */}
          <Text fontWeight="bold" mb={4}>Engagement Metrics</Text>
          <SimpleGrid columns={3} spacing={4}>
            <Stat size="sm">
              <StatLabel>Avg Score</StatLabel>
              <StatNumber>{analysis.engagement.avg_score.toFixed(1)}</StatNumber>
            </Stat>
            <Stat size="sm">
              <StatLabel>Avg Comments</StatLabel>
              <StatNumber>{analysis.engagement.avg_comments.toFixed(1)}</StatNumber>
            </Stat>
            <Stat size="sm">
              <StatLabel>Upvote Ratio</StatLabel>
              <StatNumber>{(analysis.engagement.upvote_ratio * 100).toFixed(1)}%</StatNumber>
            </Stat>
          </SimpleGrid>
        </>
      )}
    </Box>
  )
}

// Base subreddit data
const baseSubreddit: Subreddit = {
  _meta: {
    earliest_comment_at: 1577836800,
    earliest_post_at: 1577836800,
    num_comments: 1250000,
    num_comments_updated_at: 1677836800,
    num_posts: 85000,
    num_posts_updated_at: 1677836800,
  },
  accept_followers: true,
  accounts_active: null,
  accounts_active_is_fuzzed: null,
  active_user_count: null,
  advertiser_category: "Technology",
  all_original_content: false,
  allow_discovery: true,
  allow_galleries: true,
  allow_images: true,
  allow_polls: true,
  allow_prediction_contributors: true,
  allow_predictions: true,
  allow_predictions_tournament: true,
  allow_talks: true,
  allow_videogifs: true,
  allow_videos: true,
  allowed_media_in_comments: ["giphy", "static"],
  banner_background_color: "#373c3f",
  banner_background_image: "",
  banner_img: null,
  banner_size: null,
  can_assign_link_flair: true,
  can_assign_user_flair: true,
  collapse_deleted_comments: false,
  comment_contribution_settings: {
    allowed_media_types: ["giphy", "static"],
  },
  comment_score_hide_mins: 0,
  community_icon: "",
  community_reviewed: true,
  content_category: "technology",
  created: 1201832000,
  created_utc: 1201832000,
  description: "A community for programmers and programming enthusiasts.",
  disable_contributor_requests: false,
  display_name: "programming",
  display_name_prefixed: "r/programming",
  emojis_custom_size: null,
  emojis_enabled: true,
  free_form_reports: true,
  has_menu_widget: false,
  header_img: null,
  header_size: null,
  header_title: null,
  hide_ads: false,
  icon_img: null,
  icon_size: null,
  id: "t5_2fwo",
  is_crosspostable_subreddit: true,
  is_enrolled_in_new_modmail: null,
  key_color: "",
  lang: "en",
  link_flair_enabled: true,
  link_flair_position: "right",
  mobile_banner_image: "",
  name: "t5_2fwo",
  notification_level: null,
  original_content_tag_enabled: false,
  over18: false,
  prediction_leaderboard_entry_type: 0,
  primary_color: "",
  public_description: "Computer Programming",
  public_traffic: false,
  quarantine: false,
  restrict_commenting: false,
  restrict_posting: false,
  retrieved_on: 1677836800,
  should_archive_posts: true,
  should_show_media_in_comments_setting: true,
  show_media: true,
  show_media_preview: true,
  spoilers_enabled: true,
  submission_type: "any",
  submit_link_label: "Submit",
  submit_text: "",
  submit_text_html: null,
  submit_text_label: "Submit",
  subreddit_type: "public",
  subscribers: 4200000,
  suggested_comment_sort: null,
  title: "programming",
  url: "/r/programming/",
  user_can_flair_in_sr: null,
  user_flair_background_color: null,
  user_flair_css_class: null,
  user_flair_enabled_in_sr: true,
  user_flair_position: "right",
  user_flair_richtext: [],
  user_flair_template_id: null,
  user_flair_text: null,
  user_flair_text_color: null,
  user_flair_type: "text",
  user_has_favorited: null,
  user_is_banned: null,
  user_is_contributor: null,
  user_is_moderator: null,
  user_is_muted: null,
  user_is_subscriber: null,
  user_sr_flair_enabled: null,
  user_sr_theme_enabled: true,
  videostream_links_count: 0,
  whitelist_status: "all_ads",
  wiki_enabled: true,
  wls: 6,
}

// Mock data array
const mockSubreddits: Subreddit[] = [
  baseSubreddit,
  {
    ...baseSubreddit,
    id: "t5_2qh1i",
    display_name: "technology",
    display_name_prefixed: "r/technology",
    title: "Technology",
    public_description: "Subreddit dedicated to the news and discussions about the creation and use of technology and its surrounding issues.",
    subscribers: 3500000,
    _meta: {
      ...baseSubreddit._meta,
      num_posts: 65000,
      num_comments: 980000,
    },
  },
  {
    ...baseSubreddit,
    id: "t5_2qh33",
    display_name: "python",
    display_name_prefixed: "r/python",
    title: "Python Programming",
    public_description: "News about the programming language Python.",
    subscribers: 1200000,
    _meta: {
      ...baseSubreddit._meta,
      num_posts: 45000,
      num_comments: 520000,
    },
  },
  {
    ...baseSubreddit,
    id: "t5_2qh0y",
    display_name: "javascript",
    display_name_prefixed: "r/javascript",
    title: "JavaScript",
    public_description: "All about the JavaScript programming language!",
    subscribers: 900000,
    _meta: {
      ...baseSubreddit._meta,
      num_posts: 35000,
      num_comments: 420000,
    },
  },
  {
    ...baseSubreddit,
    id: "t5_2rc7j",
    display_name: "webdev",
    display_name_prefixed: "r/webdev",
    title: "Web Development",
    public_description: "A community dedicated to all things web development.",
    subscribers: 850000,
    _meta: {
      ...baseSubreddit._meta,
      num_posts: 32000,
      num_comments: 380000,
    },
  },
]

export default function SubredditView() {
  const { 
    selectedSubreddit,
    setSelectedSubreddit,
    viewMode,
  } = useRedditAnalysis()

  const theme = useColorModeValue("ag-theme-alpine", "ag-theme-alpine-dark")

  // Column Definitions
  const columnDefs = useMemo<ColDef[]>(() => [
    {
      headerName: "Subreddit",
      field: "display_name_prefixed",
      width: 150,
      pinned: 'left',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: "Type",
      field: "subreddit_type",
      width: 120,
      cellRenderer: TypeCellRenderer,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: "Subscribers",
      field: "subscribers",
      width: 120,
      valueFormatter: numberFormatter,
      filter: 'agNumberColumnFilter',
    },
    {
      headerName: "Posts",
      field: "_meta.num_posts",
      width: 100,
      valueFormatter: numberFormatter,
      filter: 'agNumberColumnFilter',
    },
    {
      headerName: "Comments",
      field: "_meta.num_comments",
      width: 120,
      valueFormatter: numberFormatter,
      filter: 'agNumberColumnFilter',
    },
    {
      headerName: "Created",
      field: "created_utc",
      width: 120,
      valueFormatter: dateFormatter,
      filter: 'agDateColumnFilter',
    },
    {
      headerName: "Category",
      field: "advertiser_category",
      width: 150,
      cellRenderer: CategoryCellRenderer,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: "NSFW",
      field: "over18",
      width: 100,
      cellRenderer: (params: any) => params.value ? 'Yes' : 'No',
      filter: 'agTextColumnFilter',
    },
  ], [])

  // Grid Options
  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    filter: true,
  }), [])

  // Mock analysis data
  const mockAnalysis: SubredditAnalysis = {
    activity: {
      posts_per_day: 45.2,
      comments_per_day: 523.8,
      peak_hours: [13, 14, 15, 16],
      peak_days: ['Monday', 'Wednesday']
    },
    content: {
      post_types: {
        'Text': 450,
        'Link': 230,
        'Image': 180,
        'Video': 90
      },
      domains: {
        'self': 450,
        'imgur.com': 120,
        'youtube.com': 80
      },
      flairs: {
        'Discussion': 200,
        'Question': 150,
        'Guide': 100
      }
    },
    engagement: {
      avg_score: 128.5,
      avg_comments: 15.3,
      upvote_ratio: 0.92
    },
    growth: {
      subscriber_growth: 2.3,
      activity_growth: 1.8
    }
  }

  // Get selected subreddit data
  const selectedSubredditData = useMemo(() => {
    return mockSubreddits.find(s => s.id === selectedSubreddit) ?? null
  }, [selectedSubreddit])

  return (
    <Grid templateColumns="1fr 400px" gap={4} height="calc(100vh - 300px)">
      {/* Left: AG Grid */}
      <Box 
        className={theme}
        width="100%"
        height="100%"
        borderRadius="md"
        overflow="hidden"
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <div 
          style={{ 
            width: '100vw', 
            height: '100vh',
          }}
        >
          <AgGridReact
            rowData={mockSubreddits}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            rowSelection="single"
            onRowClicked={(event) => setSelectedSubreddit(event.data.id)}
            rowClass={(params) => 
              params.data.id === selectedSubreddit ? 'selected-row' : ''
            }
            enableCellTextSelection={true}
            pagination={true}
            paginationAutoPageSize={true}
            domLayout="normal"
          />
        </div>
      </Box>

      {/* Right: Analysis Panel */}
      <Box 
        p={4} 
        borderLeft="1px" 
        borderColor={useColorModeValue("gray.200", "gray.700")}
        overflowY="auto"
        bg={useColorModeValue("white", "gray.800")}
        borderRadius="md"
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <SubredditAnalysisPanel 
          subreddit={selectedSubredditData}
          analysis={mockAnalysis}
        />
      </Box>
    </Grid>
  )
} 