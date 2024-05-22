import { queryOptions } from '@tanstack/react-query'
import { fetchInvoiceById, fetchInvoices } from './mock'

export const invoicesQueryOptions = () =>
  queryOptions({
    queryKey: ['invoices'],
    queryFn: () => fetchInvoices(),
  })

export const invoiceQueryOptions = (invoiceId: number) =>
  queryOptions({
    queryKey: ['invoices', invoiceId],
    queryFn: () => fetchInvoiceById(invoiceId),
  })
