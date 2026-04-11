import { cn } from "@/lib/utils"

const PageStructure = ({ className, children }) => {
  return <div className={cn("w-full flex-1", className)}>{children}</div>
}

export default PageStructure
