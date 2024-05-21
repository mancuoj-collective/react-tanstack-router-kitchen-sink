import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div>
      <h2 className="border-b bg-muted/30 p-3">Layout</h2>
      <Outlet />
    </div>
  )
}
