import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/layout-a')({
  component: LayoutAComponent,
})

function LayoutAComponent() {
  return <div className="p-3">I'm A</div>
}
