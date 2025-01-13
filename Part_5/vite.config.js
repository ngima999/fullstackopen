import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy configuration to handle API calls during development
      "/api": {
        target: "http://localhost:3001", // Backend server URL
        changeOrigin: true, // Adjusts the origin of the request
      },
    },
  },
  test: {
    // Vite test configuration
    environment: 'jsdom', // Environment setup for testing (browser-like environment)
    globals: true, // Enabling global variables like `describe` and `it` for testing
    setupFiles: './testSetup.js', // Path to the setup file for the test environment
  },
})
