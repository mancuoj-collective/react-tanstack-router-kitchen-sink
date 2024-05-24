import { createFileRoute } from '@tanstack/react-router'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { useCreateInvoiceMutation } from '~/utils/api'
import { cn } from '~/utils/cn'

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

  return (
    <div>
      <form className="space-y-3 p-3" onSubmit={(e) => handleSubmit(e)}>
        <Input name="title" placeholder="Invoice Title" />
        <Textarea name="body" placeholder="Invoice Body" className="h-60" />
        <Button
          type="submit"
          variant="outline"
          className="w-full"
          disabled={createInvoiceMutation.status === 'pending'}
        >
          Create New Invoice
          <span
            className={cn('i-lucide-loader-circle animate-spin text-lg ml-3', {
              hidden: createInvoiceMutation.status !== 'pending',
            })}
          />
        </Button>
      </form>
    </div>
  )
}
