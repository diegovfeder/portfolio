import { defineConfig } from '@solidjs/start/config'
import pkg from '@vinxi/plugin-mdx'

const { default: mdx } = pkg

export default defineConfig({
  extensions: ['mdx', 'md'],
  vite: {
    assetsInclude: ['**/*.md'],
    plugins: [
      mdx.withImports({})({
        jsx: true,
        jsxImportSource: 'solid-js',
        providerImportSource: 'solid-mdx',
      }),
    ],
  },
  server: {
    preset: 'vercel',
    prerender: {
      crawlLinks: true,
    },
  },
})
