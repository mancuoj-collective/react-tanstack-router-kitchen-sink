import axios from 'redaxios'
import { loaderDelayFn } from './delay'
import type { Invoice, User } from './types'

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
