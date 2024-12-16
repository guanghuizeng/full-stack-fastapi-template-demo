import { createFileRoute } from "@tanstack/react-router"
import ScenarioDetail from "../../../../components/Simulation/ScenarioDetail"

export const Route = createFileRoute("/_layout/simulation/scenario/$scenarioId")({
  component: ScenarioDetailPage,
})

function ScenarioDetailPage() {
  const { scenarioId } = Route.useParams()
  return <ScenarioDetail instanceId={scenarioId} />
} 