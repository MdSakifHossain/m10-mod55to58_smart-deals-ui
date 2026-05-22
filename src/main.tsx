import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { RouterProvider } from "react-router/dom"
import { router } from "./router"

import { ThemeProvider } from "@/components/theme-provider.tsx"
import "./index.css"
import AuthProvider from "./contexts/AuthProvider"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
)
