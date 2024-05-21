import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardIndexComponent,
})

function DashboardIndexComponent() {
  return (
    <div className="p-3">
      <h2>Welcome to the Dashboard.</h2>
    </div>
  )
}
