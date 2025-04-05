// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Import the 'path' module
import { fileURLToPath } from 'url' // Import 'fileURLToPath' from 'url'

// Define __dirname for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // --- Add this resolve configuration ---
  resolve: {
    alias: {
      // Set '@' alias to point to the 'src' directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  // --- End resolve configuration ---
})