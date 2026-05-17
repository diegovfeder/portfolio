import path from 'node:path'
import { defineConfig } from 'vitest/config'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environmentMatchGlobs: [
      ['**/*.test.tsx', 'jsdom'],
      ['**/routes/*.test.ts', 'node'],
    ],
  },
})
