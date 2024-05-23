import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/users')({
  component: UsersComponent,
})

function UsersComponent() {
  return (
    <div className="p-3">
      <h1>Users</h1>
      <Outlet />
    </div>
  )
}
