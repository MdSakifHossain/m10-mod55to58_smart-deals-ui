import { Header } from "@/components/my-components/Header"
import { Outlet } from "react-router"

const Unusual = () => {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <div className="flex flex-1 justify-center px-20 py-10">
        <Outlet />
      </div>
    </div>
  )
}

export default Unusual
