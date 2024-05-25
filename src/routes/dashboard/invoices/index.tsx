import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { InvoiceFields } from '~/components/invoice-fields'
import { Button } from '~/components/ui/button'

import { useCreateInvoiceMutation } from '~/utils/api'

export const Route = createFileRoute('/dashboard/invoices/')({
  component: InvoicesIndexComponent,
})

function InvoicesIndexComponent() {
  const createInvoiceMutation = useCreateInvoiceMutation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const formData = new FormData(e.target as HTMLFormElement)
    createInvoiceMutation.mutate({
      title: formData.get('title') as string,
      body: formData.get('body') as string,
    })
  }

  useEffect(() => {
    if (createInvoiceMutation.status === 'success') {
      toast.success('Invoice created successfully')
    } else if (createInvoiceMutation.status === 'error') {
      toast.error('Error creating invoice')
    }
  }, [createInvoiceMutation.status])

  return (
    <div>
      <form className="space-y-3 p-3" onSubmit={(e) => handleSubmit(e)}>
        <InvoiceFields disabled={createInvoiceMutation.status === 'pending'} />
        <Button
          type="submit"
          variant="outline"
          className="w-full"
          disabled={createInvoiceMutation.status === 'pending'}
        >
          {createInvoiceMutation.status !== 'pending' ? (
            <>Create New Invoice</>
          ) : (
            <>
              Creating <span className="i-lucide-loader-circle ml-3 animate-spin text-lg" />
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
