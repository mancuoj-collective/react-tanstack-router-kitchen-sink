import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/layout-b')({
  component: LayoutBComponent,
})

function LayoutBComponent() {
  return <div className="p-3">I'm B</div>
}
