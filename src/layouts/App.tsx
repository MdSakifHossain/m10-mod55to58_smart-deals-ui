import { Footer2 } from "@/components/footer2"
import { Header } from "@/components/my-components/Header"
import { Outlet } from "react-router"

export function App() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <div className="flex flex-1 flex-col px-20 py-10">
        <Outlet />
      </div>
      <Footer2 className="bg-primary pt-20 pb-10" />
    </div>
  )
}

export default App
