// @ts-nocheck
import PageStructure from "@/components/my-components/PageStructure"
import HeroSection from "./HeroSection"
import RecentProducts from "./RecentProducts"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"

export default function Homepage() {
  const [recentStuff, setRecentStuff] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const doTheThing = async () => {
      try {
        setLoading(true)
        const { data } = await api.get("/latest-products")
        setRecentStuff(data)
        setError(null)
      } catch (err) {
        console.error(err)
        setError("Failed to load recent products")
      } finally {
        setLoading(false)
      }
    }

    doTheThing()
  }, [])

  return (
    <PageStructure>
      <HeroSection />
      <RecentProducts products={recentStuff} loading={loading} error={error} />
    </PageStructure>
  )
}
