import { Link, createFileRoute } from '@tanstack/react-router'
import { Button } from '~/components/ui/button'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div>
      <h2 className="border-b bg-muted/30 p-3">Welcome Home 🐶</h2>
      <Button asChild variant="outline" className="m-3">
        <Link
          to="/dashboard/invoices/$invoiceId"
          params={{
            invoiceId: 3,
          }}
        >
          1 New Invoice
        </Link>
      </Button>
    </div>
  )
}
