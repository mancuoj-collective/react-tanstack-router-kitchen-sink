import { createFileRoute, useRouter } from '@tanstack/react-router'
import { type FormEvent, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

export const Route = createFileRoute('/login')({
  component: LoginComponent,
})

function LoginComponent() {
  const router = useRouter()
  const { auth, status } = Route.useRouteContext({
    select: ({ auth }) => ({ auth, status: auth.status }),
  })
  const [username, setUsername] = useState('')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    auth.login(username)
    // invalidate all route matches
    router.invalidate()
  }

  if (status === 'loggedIn') {
    return (
      <div className="space-y-3 p-3">
        <div>
          Logged in as <strong>{auth.username}</strong>
        </div>
        <Button
          onClick={() => {
            auth.logout()
            router.invalidate()
          }}
        >
          Log out
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-3 p-3">
      <div>You must log in to access this page.</div>
      <form onSubmit={onSubmit} className="flex gap-3">
        <Input className="w-52" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}
