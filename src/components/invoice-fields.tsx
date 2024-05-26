import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import type { Invoice } from '~/types'

interface InvoiceFieldsProps {
  invoice?: Invoice
  disabled?: boolean
}

export function InvoiceFields({ invoice = {} as Invoice, disabled }: InvoiceFieldsProps) {
  return (
    <>
      <Input name="title" placeholder="Invoice Title" defaultValue={invoice?.title} disabled={disabled} />
      <Textarea name="body" placeholder="Invoice Body" defaultValue={invoice?.body} rows={10} disabled={disabled} />
    </>
  )
}
