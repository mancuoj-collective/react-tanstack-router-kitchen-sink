import axios from 'redaxios'
import type { Invoice, User } from '../types'
import { loaderDelayFn } from './delay'

let invoices: Invoice[] = null!
let invoicesPromise: Promise<void>

const ensureInvoices = async () => {
  if (!invoicesPromise) {
    invoicesPromise = Promise.resolve().then(async () => {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
      invoices = data.slice(0, 10)
    })
  }

  await invoicesPromise
}

export async function fetchInvoices() {
  return loaderDelayFn(() => ensureInvoices().then(() => invoices))
}

export async function fetchInvoiceById(id: number) {
  return loaderDelayFn(() =>
    ensureInvoices().then(() => {
      const invoice = invoices.find((d) => d.id === id)
      if (!invoice) {
        throw new Error('Invoice not found')
      }
      return invoice
    }),
  )
}

let users: User[] = null!
let usersPromise: Promise<void>

const ensureUsers = async () => {
  if (!usersPromise) {
    usersPromise = Promise.resolve().then(async () => {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
      users = data.slice(0, 10)
    })
  }

  await usersPromise
}

export type UsersSortBy = 'name' | 'id' | 'email'

export async function fetchUsers({ filterBy, sortBy }: { filterBy?: string; sortBy?: UsersSortBy } = {}) {
  return loaderDelayFn(() =>
    ensureUsers().then(() => {
      let usersDraft = users

      if (filterBy) {
        usersDraft = usersDraft.filter((d) => d.name.toLowerCase().includes(filterBy.toLowerCase()))
      }

      if (sortBy) {
        usersDraft = [...usersDraft].sort((a, b) => {
          return a[sortBy] > b[sortBy] ? 1 : -1
        })
      }

      return usersDraft
    }),
  )
}
