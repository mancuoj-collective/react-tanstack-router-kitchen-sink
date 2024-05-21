import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div>
      <h2 className="border-b bg-muted/30 p-3">Welcome Home 🐶</h2>
    </div>
  )
}
