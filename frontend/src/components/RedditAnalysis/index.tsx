import { Grid } from "@chakra-ui/react"
import FilterPanel from "./FilterPanel"
import PostList from "./PostList"
import AnalysisPanel from "./AnalysisPanel"

export default function RedditAnalysisContent() {
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        md: "250px 1fr",
        lg: "250px 1fr 400px"
      }}
      gap={4}
      p={4}
    >
      <FilterPanel />
      <PostList />
      <AnalysisPanel />
    </Grid>
  )
} 