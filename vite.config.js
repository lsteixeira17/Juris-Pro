import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
  ,
  build: {
    // Ajustar limite do aviso para chunks grandes
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id) return
          if (id.includes('node_modules')) {
            const parts = id.split('node_modules/')[1].split('/')
            // lidar com scoped packages
            const pkg = parts[0].startsWith('@') ? parts.slice(0, 2).join('/') : parts[0]

            // Separar bibliotecas grandes em chunks próprios
            const bigLibs = ['react', 'react-dom', 'recharts', 'lucide-react', 'framer-motion', 'date-fns']
            if (bigLibs.includes(pkg)) return `vendor.${pkg.replace('/', '-')}`

            // agrupar demais node_modules em 'vendor'
            return 'vendor'
          }
        }
      }
    }
  }
})
