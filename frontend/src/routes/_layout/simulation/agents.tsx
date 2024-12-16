import { createFileRoute } from "@tanstack/react-router"
import AgentsView from "../../../components/Simulation/AgentsView"

export const Route = createFileRoute("/_layout/simulation/agents")({
  component: AgentsView,
}) 