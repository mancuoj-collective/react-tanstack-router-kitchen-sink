import '@fontsource-variable/inter'
import '@fontsource-variable/source-serif-4'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorComponent, RouterProvider, createRouter } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'
import { routeTree } from './routeTree.gen'
import '~/styles/index.css'
import { useSessionStorage } from '~/hooks/use-session-storage'
import { Card, CardContent } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Slider } from '~/components/ui/slider'

export const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <div>Loading...</div>,
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    auth: undefined,
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  const [loaderDelay, setLoaderDelay] = useSessionStorage('loaderDelay', 500)
  const [pendingMs, setPendingMs] = useSessionStorage('pendingMs', 1000)
  const [pendingMinMs, setPendingMinMs] = useSessionStorage('pendingMinMs', 500)

  return (
    <>
      <Card className="fixed bottom-3 left-3 py-4">
        <CardContent>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Button onClick={() => setLoaderDelay(150)}>Fast</Button>
              <Button onClick={() => setLoaderDelay(500)}>Fast 3G</Button>
              <Button onClick={() => setLoaderDelay(2000)}>Slow 3G</Button>
            </div>
            <div>Layer Delay: {loaderDelay}ms</div>
            <Slider
              min={0}
              max={5000}
              step={100}
              value={[loaderDelay]}
              onValueChange={(value) => setLoaderDelay(value[0])}
            />
          </div>
        </CardContent>
      </Card>
      <RouterProvider router={router} defaultPendingMs={pendingMs} defaultPendingMinMs={pendingMinMs} />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
)
