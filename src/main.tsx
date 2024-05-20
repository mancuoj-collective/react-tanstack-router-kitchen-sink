import '@fontsource-variable/inter'
import '@fontsource-variable/source-serif-4'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorComponent, RouterProvider, createRouter } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'
import { routeTree } from './routeTree.gen'
import { auth } from '~/utils/auth'
import '~/styles/index.css'

export const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <div>Loading...</div>,
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

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        defaultPreload="intent"
        defaultPendingMs={1000}
        defaultPendingMinMs={500}
        context={{ auth }}
      />
    </QueryClientProvider>,
  )
}
