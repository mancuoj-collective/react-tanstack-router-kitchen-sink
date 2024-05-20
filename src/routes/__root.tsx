import { Outlet, createRootRouteWithContext, useRouterState } from '@tanstack/react-router'
import { Toaster } from '~/components/ui/sonner'
import { ThemeToggle } from '~/components/theme-toggle'
import { cn } from '~/utils/cn'
import { Auth } from '~/utils/auth'
import { QueryClient } from '@tanstack/react-query'

export const Route = createRootRouteWithContext<{
  auth: Auth
  queryClient: QueryClient
}>()({
  component: Root,
})

function Root() {
  const isLoading = useRouterState({ select: (s) => s.status === 'pending' })

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden font-sans antialiased">
      <div className="flex items-center gap-5 border-b bg-muted/40 px-5 py-3">
        <h1 className="text-2xl font-bold">Kitchen Sink</h1>
        <span className={cn('i-lucide-loader animate-spin text-xl', { hidden: !isLoading })} />
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
      <div className="flex flex-1">
        <div className="w-56 border-r bg-muted/40"></div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      <Toaster />
    </div>
  )
}
