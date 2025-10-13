import { useRoutes } from "react-router-dom"
import { appRoutes } from "./router/routes"

export default function App() {
  // React Router v6 hook that takes your routes array
  const element = useRoutes(appRoutes)
  return element
}
