import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { invoiceQueryOptions } from '~/utils/api'

export const Route = createFileRoute('/dashboard/invoices/$invoiceId')({
  parseParams: (params) => ({
    invoiceId: z.number().int().parse(Number(params.invoiceId)),
  }),
  stringifyParams: ({ invoiceId }) => ({ invoiceId: `${invoiceId}` }),
  loader: ({ context, params }) => context.queryClient.ensureQueryData(invoiceQueryOptions(params.invoiceId)),
  component: InvoiceComponent,
})

function InvoiceComponent() {
  const params = Route.useParams()
  const invoiceQuery = useSuspenseQuery(invoiceQueryOptions(params.invoiceId))
  const invoice = invoiceQuery.data

  return (
    <form className="p-3">
      {JSON.stringify(invoice, null, 2)}
      <Button>Save</Button>
    </form>
  )
}
