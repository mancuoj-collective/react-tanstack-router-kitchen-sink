/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayoutImport } from './routes/_layout'
import { Route as IndexImport } from './routes/index'
import { Route as LayoutLayoutBImport } from './routes/_layout.layout-b'
import { Route as LayoutLayoutAImport } from './routes/_layout.layout-a'

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const LayoutLayoutBRoute = LayoutLayoutBImport.update({
  path: '/layout-b',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutLayoutARoute = LayoutLayoutAImport.update({
  path: '/layout-a',
  getParentRoute: () => LayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/_layout/layout-a': {
      id: '/_layout/layout-a'
      path: '/layout-a'
      fullPath: '/layout-a'
      preLoaderRoute: typeof LayoutLayoutAImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/layout-b': {
      id: '/_layout/layout-b'
      path: '/layout-b'
      fullPath: '/layout-b'
      preLoaderRoute: typeof LayoutLayoutBImport
      parentRoute: typeof LayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  LayoutRoute: LayoutRoute.addChildren({
    LayoutLayoutARoute,
    LayoutLayoutBRoute,
  }),
})

/* prettier-ignore-end */
