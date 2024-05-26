import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, Outlet, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { z } from 'zod'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { usersQueryOptions } from '~/utils/api'
import type { UsersSortBy } from '~/utils/mock'

export const Route = createFileRoute('/dashboard/users')({
  validateSearch: z.object({
    usersView: z
      .object({
        sortBy: z.enum(['name', 'id', 'email']).optional(),
        filterBy: z.string().optional(),
      })
      .optional(),
  }).parse,
  preSearchFilters: [
    // Persist (or set as default) the usersView search param while navigating within or to this route (or it's children!)
    (search) => ({
      ...search,
      usersView: {
        ...search.usersView,
      },
    }),
  ],
  loader: ({ context, deps }) => context.queryClient.ensureQueryData(usersQueryOptions(deps)),
  component: UsersComponent,
})

function UsersComponent() {
  const navigate = useNavigate({ from: Route.fullPath })
  const { data: users } = useSuspenseQuery(usersQueryOptions(Route.useLoaderDeps()))
  const { usersView } = Route.useSearch()
  const sortBy = usersView?.sortBy ?? 'name'
  const filterBy = usersView?.filterBy
  const [filterDraft, setFilterDraft] = useState(filterBy ?? '')

  useEffect(() => {
    setFilterDraft(filterBy ?? '')
  }, [filterBy])

  useEffect(() => {
    navigate({
      search: (old) => {
        return {
          ...old,
          usersView: {
            ...old?.usersView,
            filterBy: filterDraft || undefined,
          },
        }
      },
      replace: true,
    })
  }, [filterDraft])

  const setSortBy = (sortBy: UsersSortBy) => {
    navigate({
      search: (old) => {
        return {
          ...old,
          usersView: {
            ...(old?.usersView ?? {}),
            sortBy,
          },
        }
      },
      replace: true,
    })
  }

  const sortedUsers = useMemo(() => {
    if (!users) return []
    return !sortBy ? users : [...users].sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
  }, [users, sortBy])

  const filteredUsers = useMemo(() => {
    if (!filterBy) return sortedUsers
    return sortedUsers.filter((user) => user.name.toLowerCase().includes(filterBy.toLowerCase()))
  }, [sortedUsers, filterBy])

  return (
    <div className="flex flex-1">
      <div className="h-full w-60 border-r">
        <div className="space-y-3 border-b p-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="id">ID</SelectItem>
              <SelectItem value="email">Email</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Filter by name ..."
            value={filterDraft}
            onChange={(e) => setFilterDraft(e.target.value)}
          />
        </div>
        <div className="flex flex-col divide-y">
          {filteredUsers.map((user) => (
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
