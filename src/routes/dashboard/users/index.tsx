import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/users/')({
  component: UsersIndexComponent,
})

function UsersIndexComponent() {
  return (
    <p className="p-3">
      In a traditional router, both would be lost while navigating around individual users or even changing each
      sort/filter option unless each state was manually passed from the current route into each new link we created
      (that's a lot of tedious and error-prone work). With TanStack router and search filters, they are persisted with
      little effort.
    </p>
  )
}
