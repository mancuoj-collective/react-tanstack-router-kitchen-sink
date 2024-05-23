import { produce } from 'immer'
import axios from 'redaxios'
import type { Invoice, PickAsRequired, User } from '../types'
import { actionDelayFn, loaderDelayFn, shuffle } from './delay'

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

export async function postInvoice(partialInvoice: Partial<Invoice>) {
  return actionDelayFn(() => {
    if (partialInvoice.title?.includes('error')) {
      console.error('Error creating invoice')
      throw new Error('Error creating invoice')
    }

    const invoice = {
      id: invoices.length + 1,
      title: partialInvoice.title || `New invoice ${String(Date.now())}`,
      body:
        partialInvoice.body ||
        shuffle(
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante.
          Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna.  Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante.
          `.split(' '),
        ).join(' '),
    }

    invoices = [...invoices, invoice]
    return invoice
  })
}

export async function patchInvoice({ id, ...updatedInvoice }: PickAsRequired<Partial<Invoice>, 'id'>) {
  return actionDelayFn(() => {
    invoices = produce(invoices, (draft) => {
      const invoice = draft.find((d) => d.id === id)
      if (!invoice) {
        throw new Error('Invoice not found.')
      }
      if (updatedInvoice.title?.toLocaleLowerCase()?.includes('error')) {
        throw new Error('Ouch!')
      }
      Object.assign(invoice, updatedInvoice)
    })

    return invoices.find((d) => d.id === id)
  })
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
