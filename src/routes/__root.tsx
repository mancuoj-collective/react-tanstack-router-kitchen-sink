import { Link, Outlet, createRootRouteWithContext, useRouterState } from '@tanstack/react-router'
import { Toaster } from '~/components/ui/sonner'
import { ThemeToggle } from '~/components/theme-toggle'
import { cn } from '~/utils/cn'
import { Auth } from '~/utils/auth'
import { QueryClient } from '@tanstack/react-query'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Button } from '~/components/ui/button'

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
      <div className="flex items-center gap-5 border-b bg-muted/40 px-5 py-3.5">
        <h1 className="font-serif text-3xl font-bold">Kitchen Sink</h1>
        <span className={cn('i-lucide-loader animate-spin text-xl', { hidden: !isLoading })} />
        <div className="ml-auto flex items-center">
          <Button asChild variant="ghost" size="icon">
            <a href="https://github.com/mancuoj-collective/react-tanstack-router-kitchen-sink">
              <GitHubLogoIcon className="size-5" />
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
      <div className="flex flex-1">
        <div className="w-56 divide-y border-r bg-muted/40">
          {[
            ['/', 'Home'],
            ['/layout-a', 'Layout A'],
            ['/layout-b', 'Layout B'],
          ].map(([to, label]) => {
            return (
              <div key={to}>
                <Link
                  to={to}
                  activeOptions={{}}
                  preload="intent"
                  className="block px-5 py-3 text-foreground/70"
                  activeProps={{ className: 'text-foreground/100' }}
                >
                  {label}
                </Link>
              </div>
            )
          })}
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      <Toaster />
    </div>
  )
}
