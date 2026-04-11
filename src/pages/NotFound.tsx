import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyTitle,
} from "@/components/ui/empty"
import { Link } from "react-router"

const NotFound = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Emp />
    </div>
  )
}

function Emp() {
  return (
    <Empty>
      <EmptyContent>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>
          The page you&apos;re looking for doesn&apos;t exist.
        </EmptyDescription>
        <EmptyDescription>
          Need help? <Link to="/">Back to Home</Link>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  )
}

export default NotFound
