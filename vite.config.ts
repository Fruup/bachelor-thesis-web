import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    watch: {
      ignored: /\/~tmp/,
    },
  },
  test: {
    environment: 'node',
    include: ['./tests/**/*.{test,spec}.ts'],
  },
})
