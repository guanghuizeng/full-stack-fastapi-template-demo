import { createFileRoute } from "@tanstack/react-router"
import AnalysisView from "../../../components/Simulation/AnalysisView"

export const Route = createFileRoute("/_layout/simulation/analysis")({
  component: AnalysisView,
}) 