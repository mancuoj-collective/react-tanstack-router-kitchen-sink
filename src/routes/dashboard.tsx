import { Link, Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: DashboardComponent,
})

const routes = [
  ['/dashboard', 'Summary', true],
  ['/dashboard/invoices', 'Invoices'],
  ['/dashboard/users', 'Users'],
] as const

function DashboardComponent() {
  return (
    <div>
      <h2 className="border-b bg-muted/30 p-3">Dashboard</h2>
      <div className="flex divide-x border-b">
        {routes.map(([to, label, exact]) => (
          <Link
            key={to}
            to={to}
            className="bg-muted/20 p-3"
            style={{ opacity: 0.6 }}
            activeOptions={{ exact }}
            activeProps={{ style: { opacity: 1 } }}
          >
            {label}
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  )
}
