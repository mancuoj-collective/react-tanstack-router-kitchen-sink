import { queryOptions } from '@tanstack/react-query'
import { fetchInvoices } from './mock'

export const invoicesQueryOptions = queryOptions({
  queryKey: ['invoices'],
  queryFn: fetchInvoices,
})
