import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div>
      <h1 className="border-b p-3">Welcome Home 🐶</h1>
    </div>
  )
}
