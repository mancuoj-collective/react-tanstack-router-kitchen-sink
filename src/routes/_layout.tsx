import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div>
      <div className="border-b bg-muted/20 p-3">Layout</div>
      <Outlet />
    </div>
  )
}
