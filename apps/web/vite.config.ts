import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import typegpu from 'unplugin-typegpu/vite'

export default defineConfig({
  plugins: [typegpu({ exclude: [/node_modules/] }), react()],
  base: '/readme-aura/',
})
