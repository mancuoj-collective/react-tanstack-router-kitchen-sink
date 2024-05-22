import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, MatchRoute, Outlet, createFileRoute } from '@tanstack/react-router'
import { invoicesQueryOptions } from '~/utils/api'
import { cn } from '~/utils/cn'

export const Route = createFileRoute('/dashboard/invoices')({
  loader: ({ context }) => context.queryClient.ensureQueryData(invoicesQueryOptions()),
  component: InvoicesComponent,
})

function InvoicesComponent() {
  const invoicesQuery = useSuspenseQuery(invoicesQueryOptions())
  const invoices = invoicesQuery.data

  return (
    <div className="flex">
      <div className="flex w-40 flex-col divide-y border-b border-r">
        {invoices.map((invoice) => (
          <Link
            key={invoice.id}
            to="/dashboard/invoices/$invoiceId"
            className="bg-muted/10 p-3"
            style={{ opacity: 0.6 }}
            activeProps={{ style: { opacity: 1 } }}
            params={{
              invoiceId: invoice.id,
            }}
            preload="intent"
          >
            #{invoice.id} - {invoice.title.slice(0, 10)}
            <MatchRoute to="/dashboard/invoices/$invoiceId" params={{ invoiceId: invoice.id }} pending>
              {(match) => <span className={cn('i-lucide-loader animate-spin text-xl', { hidden: !match })} />}
            </MatchRoute>
          </Link>
        ))}
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}
