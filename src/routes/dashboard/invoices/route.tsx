import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { ScrollArea } from '~/components/ui/scroll-area'
import { invoicesQueryOptions } from '~/utils/api'

export const Route = createFileRoute('/dashboard/invoices')({
  loader: ({ context }) => context.queryClient.ensureQueryData(invoicesQueryOptions()),
  component: InvoicesComponent,
})

function InvoicesComponent() {
  const { data: invoices } = useSuspenseQuery(invoicesQueryOptions())
  const [height, setHeight] = useState(0)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function updateHeight() {
      if (scrollAreaRef.current) {
        const topOffset = scrollAreaRef.current.getBoundingClientRect().top
        setHeight(window.innerHeight - topOffset)
      }
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => {
      window.removeEventListener('resize', updateHeight)
    }
  }, [])

  return (
    <div className="flex flex-1">
      <ScrollArea ref={scrollAreaRef} style={{ height }} className="w-60">
        <div className="flex flex-col divide-y border-r">
          {invoices.map((invoice) => (
            <Link
              key={invoice.id}
              to="/dashboard/invoices/$invoiceId"
              className="bg-muted/10 px-5 py-3"
              style={{ opacity: 0.6 }}
              activeProps={{ style: { opacity: 1 } }}
              params={{
                invoiceId: invoice.id,
              }}
              preload="intent"
            >
              <div className="line-clamp-1">
                #{invoice.id} - {invoice.title}
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}
