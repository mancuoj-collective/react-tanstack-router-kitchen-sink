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
    <div className="flex flex-1">
      <div className="flex h-full w-52 flex-col divide-y border-r">
        {invoices.map((invoice) => (
          <Link
            key={invoice.id}
            to="/dashboard/invoices/$invoiceId"
            className="bg-muted/10 px-5 py-3"
            style={{ opacity: 0.6 }}
            activeProps={{ style: { opacity: 1 } }}
            params={{
              invoiceId: invoice.id,
            }}
            preload="intent"
          >
            <div className="line-clamp-1">
              #{invoice.id} - {invoice.title}
            </div>
            <MatchRoute to="/dashboard/invoices/$invoiceId" params={{ invoiceId: invoice.id }} pending>
              {(match) => <span className={cn('i-lucide-loader-circle animate-spin text-xl', { hidden: !match })} />}
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