import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { InvoiceFields } from '~/components/invoice-fields'
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <form key={invoice.id} className="space-y-3 p-3" onSubmit={(e) => handleSubmit(e)}>
      <InvoiceFields invoice={invoice} />
      <Button type="submit" variant="outline" className="w-full">
        Save
      </Button>
    </form>
  )
}
