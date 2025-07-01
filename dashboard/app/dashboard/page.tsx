import { DashboardHeader } from "@/components/dashboard-header"
import { MapSection } from "@/components/map-section"
import { FiltersSidebar } from "@/components/filters-sidebar"
import { ChartsSection } from "@/components/charts-section"

export default function DashboardPage() {
  return (
    <div className="h-screen flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1 overflow-hidden">
        <MapSection />
        <FiltersSidebar />
      </div>

      <ChartsSection />
    </div>
  )
}
