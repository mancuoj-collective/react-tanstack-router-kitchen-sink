import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/users/')({
  component: UsersIndexComponent,
})

function UsersIndexComponent() {
  return (
    <div className="p-3">
      <h1>Users Index</h1>
    </div>
  )
}
