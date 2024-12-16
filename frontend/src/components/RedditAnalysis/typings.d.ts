// Subreddit Types
export interface SubredditMeta {
	earliest_comment_at: number | null
	earliest_post_at: number | null
	num_comments: number
	num_comments_updated_at: number | null
	num_posts: number
	num_posts_updated_at: number | null
}

export type AdvertiserCategory =
	| ""
	| "Lifestyles"
	| "Sports"
	| "Technology"
	| "Games"
	| "Automotive"
	| "Entertainment"
	| "College / University"
	| "Local"
	| "Health"
	| "Business / Finance"
	| "Family & Youth"
	| "Retail"
	| "Travel"
	| null

export type ContentCategory =
	| "photography"
	| "drawing_and_painting"
	| "gaming"
	| "entertainment"
	| "videos"
	| "animals"
	| "food"
	| "music"
	| "diy_and_crafts"
	| "memes"
	| "funny"
	| "writing"

export type MediaType = "giphy" | "static" | "animated" | "expression"
export type SubredditType = "user" | "public" | "restricted" | "private" | "employees_only" | "archived" | "gold_only"
export type CommentSort = "qa" | "new" | "confidence" | "top" | "blank" | "old" | "controversial" | "live" | "random" | null
export type WhitelistStatus = null | "all_ads" | "some_ads" | "house_only" | "promo_all" | "promo_adult_nsfw"

export interface SubredditQuarantine {
	crossposts: boolean
	galleries: boolean
	images: boolean
	media: boolean
	polls: boolean
	sharing: boolean
	sr_images: boolean
	styles: boolean
	subscriber_count: boolean
	videos: boolean
}

export interface Subreddit {
	_meta: SubredditMeta
	accept_followers: boolean | null
	accounts_active: null
	accounts_active_is_fuzzed: boolean | null
	active_user_count: null
	advertiser_category: AdvertiserCategory
	all_original_content: boolean | null
	allow_discovery: boolean | null
	allow_galleries: boolean | null
	allow_images: boolean | null
	allow_polls: boolean | null
	allow_prediction_contributors: boolean
	allow_predictions: boolean
	allow_predictions_tournament: boolean
	allow_talks: boolean
	allow_videogifs: boolean
	allow_videos: boolean
	allowed_media_in_comments: MediaType[]
	banner_background_color: string | null
	banner_background_image: string
	banner_img: string | null
	banner_size: null | number[]
	can_assign_link_flair: boolean
	can_assign_user_flair: boolean
	collapse_deleted_comments: boolean | null
	comment_contribution_settings: {
		allowed_media_types?: null | MediaType[]
	}
	comment_score_hide_mins: number | null
	community_icon: string
	community_reviewed: boolean | null
	content_category?: ContentCategory
	created: number
	created_utc: number
	description: string | null
	disable_contributor_requests: boolean | null
	display_name: string
	display_name_prefixed: string
	emojis_custom_size: null | number[]
	emojis_enabled: boolean
	free_form_reports: boolean | null
	has_menu_widget: boolean
	header_img: null | string
	header_size: null | number[]
	header_title: string | null
	hide_ads: boolean | null
	icon_img: string | null
	icon_size: null | number[]
	id: string
	is_crosspostable_subreddit: boolean | null
	is_enrolled_in_new_modmail: null
	key_color: string | null
	lang: string | null
	link_flair_enabled: boolean | null
	link_flair_position: "" | "right" | "left" | null
	mobile_banner_image: string | null
	name: string
	notification_level: null | "low"
	original_content_tag_enabled: boolean | null
	over18: boolean | null
	prediction_leaderboard_entry_type: number | null
	primary_color: string | null
	public_description: string
	public_traffic: boolean | null
	quarantine: boolean | null
	quarantine_message?: string
	quarantine_message_html?: string
	quarantine_permissions?: SubredditQuarantine
	restrict_commenting: boolean | null
	restrict_posting: boolean | null
	retrieved_on: number
	should_archive_posts: boolean | null
	should_show_media_in_comments_setting: boolean
	show_media: boolean | null
	show_media_preview: boolean | null
	spoilers_enabled: boolean | null
	submission_type: "any" | "self" | "link" | null
	submit_link_label: string | null
	submit_text: string | null
	submit_text_html: null | string
	submit_text_label: string | null
	subreddit_type: SubredditType
	subscribers: number | null
	suggested_comment_sort: CommentSort
	title: string
	url: string
	user_can_flair_in_sr: null
	user_flair_background_color: null
	user_flair_css_class: null
	user_flair_enabled_in_sr: boolean | null
	user_flair_position: "right" | "left" | "" | null
	user_flair_richtext: []
	user_flair_template_id: null | string
	user_flair_text: null
	user_flair_text_color: null | string
	user_flair_type: "text" | "richtext"
	user_has_favorited: null | boolean
	user_is_banned: null | boolean
	user_is_contributor: null | boolean
	user_is_moderator: null | boolean
	user_is_muted: null | boolean
	user_is_subscriber: null | boolean
	user_sr_flair_enabled: null
	user_sr_theme_enabled: boolean | null
	videostream_links_count?: number
	whitelist_status: WhitelistStatus
	wiki_enabled: null | boolean
	wls: null | number
}

// Post Types
export interface Post {
	id: string
	title: string
	author: string
	subreddit: string
	score: number
	num_comments: number
	created_utc: number
	permalink: string
	url: string
	is_self: boolean
	is_video: boolean
	domain: string
	over_18: boolean
	spoiler: boolean
	locked: boolean
	stickied: boolean
	content?: string
	media?: {
		type: string
		url: string
	}
	flair?: {
		text: string
		background_color: string
		text_color: string
	}
}

// Author Types
export interface Author {
	id: string
	name: string
	created_utc: number
	comment_karma: number
	link_karma: number
	is_mod: boolean
	is_gold: boolean
	verified: boolean
	has_verified_email: boolean
	profile_img?: string
	profile_color?: string
	active_communities: string[]
	recent_activity: {
		posts: number
		comments: number
		gilded: number
	}
}

// Analysis Types
export interface SubredditAnalysis {
	activity: {
		posts_per_day: number
		comments_per_day: number
		peak_hours: number[]
		peak_days: string[]
	}
	content: {
		post_types: Record<string, number>
		domains: Record<string, number>
		flairs: Record<string, number>
	}
	engagement: {
		avg_score: number
		avg_comments: number
		upvote_ratio: number
	}
	growth: {
		subscriber_growth: number
		activity_growth: number
	}
}

export interface PostAnalysis {
	sentiment: {
		score: number
		label: string
		keywords: string[]
	}
	engagement: {
		score_percentile: number
		comment_percentile: number
		peak_activity: string
	}
	similar_posts: Array<{
		id: string
		title: string
		similarity: number
	}>
}

export interface AuthorAnalysis {
	activity_pattern: {
		active_hours: number[]
		active_days: string[]
		post_frequency: number
		comment_frequency: number
	}
	content_analysis: {
		top_subreddits: Array<{
			name: string
			posts: number
			comments: number
		}>
		top_topics: string[]
		writing_style: {
			avg_length: number
			complexity: number
			formality: number
		}
	}
	engagement_metrics: {
		avg_post_score: number
		avg_comment_score: number
		response_rate: number
	}
}