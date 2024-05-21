import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { invoicesQueryOptions } from '~/utils/api'

export const Route = createFileRoute('/dashboard/')({
  loader: ({ context }) => context.queryClient.ensureQueryData(invoicesQueryOptions),
  component: DashboardIndexComponent,
})

function DashboardIndexComponent() {
  const invoicesQuery = useSuspenseQuery(invoicesQueryOptions)
  const invoices = invoicesQuery.data

  return (
    <div className="p-3">
      <h2>
        Welcome to the Dashboard. You have <strong>{invoices.length}</strong> total invoices.
      </h2>
    </div>
  )
}
