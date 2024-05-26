import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { InvoiceFields } from '~/components/invoice-fields'
import { Button } from '~/components/ui/button'

import { useCreateInvoiceMutation } from '~/utils/api'

export const Route = createFileRoute('/dashboard/invoices/')({
  component: InvoicesIndexComponent,
})

function InvoicesIndexComponent() {
  const createInvoiceMutation = useCreateInvoiceMutation()
  const formRef = useRef<HTMLFormElement>(null)

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
      toast.success('Created successfully')
      formRef.current?.reset()
    } else if (createInvoiceMutation.status === 'error') {
      toast.error('Error creating invoice')
    }
  }, [createInvoiceMutation.status])

  return (
    <form ref={formRef} className="space-y-3 p-3" onSubmit={handleSubmit}>
      <InvoiceFields disabled={createInvoiceMutation.status === 'pending'} />
      <Button type="submit" variant="outline" className="w-full" disabled={createInvoiceMutation.status === 'pending'}>
        {createInvoiceMutation.status === 'pending' ? (
          <>
            <span className="i-lucide-loader-circle mr-3 animate-spin text-lg" /> Creating
          </>
        ) : (
          <>Create New Invoice</>
        )}
      </Button>
    </form>
  )
}
