import { createFileRoute } from "@tanstack/react-router"
import WorldsView from "../../../components/Simulation/WorldsView"

export const Route = createFileRoute("/_layout/simulation/worlds")({
  component: WorldsView,
}) 