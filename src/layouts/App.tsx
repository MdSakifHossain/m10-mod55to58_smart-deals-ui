import { Footer2 } from "@/components/footer2"
import { Header } from "@/components/my-components/Header"
import { Outlet } from "react-router"

export function App() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <div className="flex-1 px-20 py-10">
        <Outlet />
      </div>
      <Footer2 className="bg-linear-to-b from-primary to-secondary pt-20 pb-10" />
    </div>
  )
}

export default App
