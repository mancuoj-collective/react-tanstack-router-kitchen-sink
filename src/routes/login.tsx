import { createFileRoute, useRouter } from '@tanstack/react-router'
import { type FormEvent, useLayoutEffect, useState } from 'react'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
}).update({
  component: LoginComponent,
})

function LoginComponent() {
  const router = useRouter()
  const search = Route.useSearch()
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

  useLayoutEffect(() => {
    if (status === 'loggedIn' && search.redirect) {
      router.history.push(search.redirect)
    }
  }, [status, search.redirect])

  if (status === 'loggedIn') {
    return (
      <div className="space-y-3 p-3">
        <div>
          Logged in as <strong>{auth.username}</strong>
        </div>
        <Button
          variant="outline"
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
      <form onSubmit={onSubmit} className="flex gap-2">
        <Input className="w-52" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Button type="submit" variant="outline">
          Login
        </Button>
      </form>
    </div>
  )
}
