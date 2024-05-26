import { queryOptions, useMutation } from '@tanstack/react-query'
import { queryClient } from '~/main'
import {
  type UsersSortBy,
  fetchInvoiceById,
  fetchInvoices,
  fetchUserById,
  fetchUsers,
  patchInvoice,
  postInvoice,
} from './mock'

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

export const useCreateInvoiceMutation = () =>
  useMutation({
    // mutationKey: ['invoices', 'create'],
    mutationFn: postInvoice,
    onSuccess: () => queryClient.invalidateQueries(),
  })

export const useUpdateInvoiceMutation = (invoiceId: number) =>
  useMutation({
    mutationKey: ['invoices', 'update', invoiceId],
    mutationFn: patchInvoice,
    onSuccess: () => queryClient.invalidateQueries(),
    gcTime: 1000 * 10,
  })

export const usersQueryOptions = (opts: { filterBy?: string; sortBy?: UsersSortBy }) =>
  queryOptions({
    queryKey: ['users', opts],
    queryFn: () => fetchUsers(opts),
  })

export const userQueryOptions = (userId: number) =>
  queryOptions({
    queryKey: ['users', userId],
    queryFn: () => fetchUserById(userId),
  })
