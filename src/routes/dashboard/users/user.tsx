import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { userQueryOptions } from '~/utils/api'

export const Route = createFileRoute('/dashboard/users/user')({
  validateSearch: z.object({
    userId: z.number(),
  }),
  loaderDeps: ({ search: { userId } }) => ({ userId }),
  loader: ({ context, deps }) => context.queryClient.ensureQueryData(userQueryOptions(deps.userId)),
  component: UserComponent,
})

function UserComponent() {
  const search = Route.useSearch()
  const { data: user } = useSuspenseQuery(userQueryOptions(search.userId))

  return (
    <div className="flex flex-col gap-3 p-3 text-foreground/70">
      <h3 className="font-bold">{user?.name}</h3>
      <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
