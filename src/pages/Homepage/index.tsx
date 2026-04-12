import PageStructure from "@/components/my-components/PageStructure"
import HeroSection from "./HeroSection"
import RecentProducts from "./RecentProducts"

export default function Homepage() {
  return (
    <PageStructure>
      <HeroSection />
      <RecentProducts />
    </PageStructure>
  )
}
