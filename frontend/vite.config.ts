/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [react()],
    server: {
        watch: {
            usePolling: true,
        },
        proxy: {
            "/getAccessToken": {
                target: "https://apitest.vipps.no/access-management-1.0/access/oauth2/token",
                changeOrigin: true,
                secure: false,
                rewrite: (p) => p.replace(/^\/getAccessToken/, ""),
            },
        },
        cors: false,
        host: true, // needed for the Docker Container port mapping to work
        strictPort: true,
        port: 5173, // you can replace this port with any port
    },
    test: {
        environment: 'jsdom',
        coverage: {
            provider: 'istanbul', // or 'v8',
            reporter: ['html'],
            reportsDirectory: './tests/coverage',
            enabled: true,
            all: true,
        },
    },
})
