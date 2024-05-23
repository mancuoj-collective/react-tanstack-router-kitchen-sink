import { GitHubLogoIcon } from '@radix-ui/react-icons'
import type { QueryClient } from '@tanstack/react-query'
import { Link, Outlet, createRootRouteWithContext, useRouterState } from '@tanstack/react-router'
import { ThemeToggle } from '~/components/theme-toggle'
import { Button } from '~/components/ui/button'
import { Toaster } from '~/components/ui/sonner'
import type { Auth } from '~/utils/auth'
import { cn } from '~/utils/cn'

export const Route = createRootRouteWithContext<{
  auth: Auth
  queryClient: QueryClient
}>()({
  component: Root,
})

const routes = [
  ['/', 'Home'],
  ['/dashboard', 'Dashboard'],
  ['/layout-a', 'Layout A'],
  ['/layout-b', 'Layout B'],
  ['/profile', 'Profile'],
  ['/login', 'Login'],
]

function Root() {
  const isLoading = useRouterState({ select: (s) => s.status === 'pending' })

  return (
    <div className="flex h-dvh flex-col font-sans antialiased">
      <div className="flex items-center gap-5 border-b bg-muted/40 px-5 py-3.5">
        <h1 className="font-serif text-3xl font-bold">Kitchen Sink</h1>
        <span className={cn('i-lucide-loader-circle animate-spin text-xl', { hidden: !isLoading })} />
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
          {routes.map(([to, label]) => {
            return (
              <div key={to}>
                <Link
                  to={to}
                  activeOptions={{}}
                  preload="intent"
                  className="block px-5 py-3"
                  style={{ opacity: 0.6 }}
                  activeProps={{
                    style: { opacity: 1 },
                  }}
                >
                  {label}
                </Link>
              </div>
            )
          })}
        </div>
        <div className="flex flex-1 flex-col">
          <Outlet />
        </div>
      </div>
      <Toaster />
    </div>
  )
}
