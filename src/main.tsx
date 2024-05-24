import '@fontsource-variable/inter'
import '@fontsource-variable/source-serif-4'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorComponent, RouterProvider, createRouter } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog'
import { Slider } from '~/components/ui/slider'
import { useSessionStorage } from '~/hooks/use-session-storage'
import { routeTree } from '~/routeTree.gen'
import { auth } from '~/utils/auth'
import '~/styles/index.css'

export const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <div className="p-3">
      <span className="i-lucide-loader-circle animate-spin text-xl" />
    </div>
  ),
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    auth: undefined!, // We'll inject this when we render
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
  const [loaderDelay, setLoaderDelay] = useSessionStorage('loaderDelay', 600)
  const [pendingMs, setPendingMs] = useSessionStorage('pendingMs', 1000)
  const [pendingMinMs, setPendingMinMs] = useSessionStorage('pendingMinMs', 500)

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="fixed bottom-3 right-3">
            <span className="i-lucide-settings mr-2" />
            Settings
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div className="flex flex-col gap-5 p-3">
            <div className="flex gap-2">
              <Button onClick={() => setLoaderDelay(150)}>Fast</Button>
              <Button onClick={() => setLoaderDelay(500)}>Fast 3G</Button>
              <Button onClick={() => setLoaderDelay(2000)}>Slow 3G</Button>
            </div>
            <div className="space-y-3">
              <div>LoaderDelay: {loaderDelay}ms</div>
              <Slider
                value={[loaderDelay]}
                onValueChange={([value]) => setLoaderDelay(value)}
                min={0}
                max={5000}
                step={100}
              />
            </div>
            <div className="space-y-3">
              <div>PendingMs: {pendingMs}ms</div>
              <Slider
                value={[pendingMs]}
                onValueChange={([value]) => setPendingMs(value)}
                min={0}
                max={5000}
                step={100}
              />
            </div>
            <div className="space-y-3">
              <div>PendingMinMs: {pendingMinMs}ms</div>
              <Slider
                value={[pendingMinMs]}
                onValueChange={([value]) => setPendingMinMs(value)}
                min={0}
                max={5000}
                step={100}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <RouterProvider
        router={router}
        defaultPreload="intent"
        defaultPendingMs={pendingMs}
        defaultPendingMinMs={pendingMinMs}
        context={{ auth }}
      />
    </>
  )
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  )
}
