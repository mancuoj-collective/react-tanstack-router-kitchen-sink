import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import { InvoiceFields } from '~/components/invoice-fields'
import { Button } from '~/components/ui/button'
import { Textarea } from '~/components/ui/textarea'
import { invoiceQueryOptions, useUpdateInvoiceMutation } from '~/utils/api'

export const Route = createFileRoute('/dashboard/invoices/$invoiceId')({
  parseParams: (params) => ({
    invoiceId: z.number().int().parse(Number(params.invoiceId)),
  }),
  stringifyParams: ({ invoiceId }) => ({ invoiceId: `${invoiceId}` }),
  loader: ({ context, params }) => context.queryClient.ensureQueryData(invoiceQueryOptions(params.invoiceId)),
  validateSearch: (search) =>
    z
      .object({
        showNotes: z.boolean().optional(),
        notes: z.string().optional(),
      })
      .parse(search),
  component: InvoiceComponent,
})

function InvoiceComponent() {
  const params = Route.useParams()
  const { data: invoice } = useSuspenseQuery(invoiceQueryOptions(params.invoiceId))
  const updateInvoiceMutation = useUpdateInvoiceMutation(params.invoiceId)
  const search = Route.useSearch()
  const [notes, setNotes] = useState(search.notes ?? '')
  const navigate = useNavigate({ from: Route.fullPath })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
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

  useEffect(() => {
    navigate({
      search: (old) => ({
        ...old,
        notes: notes || undefined,
      }),
      replace: true,
      params: true,
    })
  }, [notes])

  return (
    <form key={invoice.id} className="space-y-3 p-3" onSubmit={handleSubmit}>
      <InvoiceFields invoice={invoice} disabled={updateInvoiceMutation.status === 'pending'} />
      <div className="flex w-full gap-2">
        <Button
          type="submit"
          variant="outline"
          disabled={updateInvoiceMutation.status === 'pending'}
          className="flex-1"
        >
          {updateInvoiceMutation.status === 'pending' ? (
            <>
              <span className="i-lucide-loader-circle mr-3 animate-spin text-lg" /> Saving
            </>
          ) : (
            <>Save</>
          )}
        </Button>
        <Button variant="outline" asChild className="w-40">
          <Link
            from={Route.fullPath}
            params={true}
            search={(old) => ({
              ...old,
              showNotes: old.showNotes ? undefined : true,
            })}
          >
            {search.showNotes ? 'Hide Notes' : 'Show Notes'}
          </Link>
        </Button>
      </div>
      {search.showNotes && (
        <Textarea
          rows={5}
          placeholder="Notes are stored in the URL. Try copying the URL into a new tab!"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      )}
    </form>
  )
}
