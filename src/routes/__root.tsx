import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Toaster } from '~/components/ui/sonner'

export const Route = createRootRoute({
  component: Root,
})

function Root() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden font-sans antialiased">
      <Outlet />
      <Toaster />
    </div>
  )
}
