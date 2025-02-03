import './app.css'
import { MetaProvider } from '@solidjs/meta'
import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense } from 'solid-js'

import { BlogNavButton, Nav, ThemeButton } from '~/components'
import { ThemeProvider } from '~/context'

export default function App() {
  return (
    <MetaProvider>
      <ThemeProvider>
        <Router
          root={(props) => (
            <>
              <Nav />
              <Suspense>
                <BlogNavButton />
                <main class="overflow-x-hidden bg-white text-black dark:bg-black dark:text-white">
                  {props.children}
                </main>
              </Suspense>
              <ThemeButton />
            </>
          )}
        >
          <FileRoutes />
        </Router>
      </ThemeProvider>
    </MetaProvider>
  )
}
