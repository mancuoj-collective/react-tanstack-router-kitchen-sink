import { createFileRoute } from '@tanstack/react-router'
import { Button } from '~/components/ui/button'

export const Route = createFileRoute('/dashboard/invoices/')({
  component: InvoicesIndexComponent,
})

function InvoicesIndexComponent() {
  return (
    <div className="p-3">
      <form>
        <Button>Create</Button>
      </form>
    </div>
  )
}
