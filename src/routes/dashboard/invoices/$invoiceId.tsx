import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import { InvoiceFields } from '~/components/invoice-fields'
import { Button } from '~/components/ui/button'
import { invoiceQueryOptions, useUpdateInvoiceMutation } from '~/utils/api'

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
  const updateInvoiceMutation = useUpdateInvoiceMutation(params.invoiceId)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const formData = new FormData(e.target as HTMLFormElement)
    updateInvoiceMutation.mutate({
      id: invoice.id,
      title: formData.get('title') as string,
      body: formData.get('body') as string,
    })
  }

  useEffect(() => {
    if (updateInvoiceMutation.status === 'success') {
      toast.success('Updated successfully')
    } else if (updateInvoiceMutation.status === 'error') {
      toast.error('Failed to update')
    }
  }, [updateInvoiceMutation.status])

  return (
    <form key={invoice.id} className="space-y-3 p-3" onSubmit={handleSubmit}>
      <InvoiceFields invoice={invoice} disabled={updateInvoiceMutation.status === 'pending'} />
      <Button type="submit" variant="outline" className="w-full" disabled={updateInvoiceMutation.status === 'pending'}>
        {updateInvoiceMutation.status === 'pending' ? (
          <>
            <span className="i-lucide-loader-circle mr-3 animate-spin text-lg" /> Saving
          </>
        ) : (
          <>Save</>
        )}
      </Button>
    </form>
  )
}
