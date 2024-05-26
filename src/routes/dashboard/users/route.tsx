import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { usersQueryOptions } from '~/utils/api'

export const Route = createFileRoute('/dashboard/users')({
  loader: ({ context, deps }) => context.queryClient.ensureQueryData(usersQueryOptions(deps)),
  component: UsersComponent,
})

function UsersComponent() {
  const { data: users } = useSuspenseQuery(usersQueryOptions(Route.useLoaderDeps()))

  return (
    <div className="flex flex-1">
      <div className="h-full w-52 border-r">
        <div className="flex flex-col divide-y">
          {users.map((user) => (
            <Link
              key={user.id}
              to="/dashboard/users/user"
              className="bg-muted/10 px-5 py-3"
              style={{ opacity: 0.6 }}
              activeProps={{ style: { opacity: 1 } }}
              search={(d) => ({
                ...d,
                userId: user.id,
              })}
            >
              <div className="line-clamp-1">{user.name}</div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}
