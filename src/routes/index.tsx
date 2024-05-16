import { createFileRoute } from '@tanstack/react-router'
import { ThemeToggle } from '~/components/theme-toggle'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="text-center">
      <ThemeToggle />
    </div>
  )
}
