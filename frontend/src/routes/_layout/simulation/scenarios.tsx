import { createFileRoute } from "@tanstack/react-router"
import ScenariosView from "../../../components/Simulation/ScenariosView"

export const Route = createFileRoute("/_layout/simulation/scenarios")({
  component: ScenariosView,
}) 