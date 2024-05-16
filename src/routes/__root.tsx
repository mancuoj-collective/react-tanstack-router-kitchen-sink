import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { ThemeToggle } from '~/components/theme-toggle'
import { Meteors } from '~/components/ui/meteors'
import { Toaster } from '~/components/ui/sonner'

export const Route = createRootRoute({
  component: Root,
})

function Root() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden font-sans antialiased">
      <div className="mx-auto p-20">
        <nav className="mb-10 flex items-center gap-3">
          <Link to="/" className="font-bold text-foreground/60 [&.active]:text-foreground">
            Home
          </Link>
          <Link to="/about" className="font-bold text-foreground/60 [&.active]:text-foreground">
            About
          </Link>
          <ThemeToggle />
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
      <Meteors />
      <Toaster />
    </div>
  )
}
