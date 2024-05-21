import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/profile')({
  component: ProfileComponent,
})

function ProfileComponent() {
  const { username } = Route.useRouteContext()
  return <div className="p-3">Username: {username}</div>
}
