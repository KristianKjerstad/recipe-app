/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

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
            "/signature": {
                target: "https://data.brreg.no/fullmakt/enheter",
                changeOrigin: true,
                secure: false,
                rewrite: (p) => p.replace(/^\/signature\/(\d+)(\/.*)?$/, "/$1/signatur"),
            },
            // "/signatureControl": {
            //     target: "https://data.vcert.brreg.no/fullmakt/enheter/910336819/signatur/kontroll?fodselsnummer=01026201914",
            //     changeOrigin: true,
            //     secure: false,
            //     rewrite: (p) => p.replace(/^\/signature\/(\d+)(\/.*)?$/, "/$1/signatur"),
            // },
            "/signatureControl": {
                target: "https://data.vcert.brreg.no/fullmakt/enheter",
                changeOrigin: true,
                secure: false,
                rewrite: (p) => p.replace(/^\/signatureControl\/([^\/]+)\/([^\/]+)$/, '/$1/signatur/kontroll?fodselsnummer=$2')
            },
            // "/signatureControlv2": {
            //     target: "https://data.vcert.brreg.no",
            //     changeOrigin: true,
            //     secure: false,
            //     rewrite: (path) => {
            //       // Extract the numbers from the path using a regex match
            //       const match = path.match(/^\/signatureControl\/(\d+)\/(\d+)$/);
            //       if (match) {
            //         const [_, orgNumber, fodselsnummer] = match;
            //         // Rewrite the path to include the query parameters as needed
            //         return `/fullmakt/enheter/${orgNumber}/signatur/kontroll?fodselsnummer=${fodselsnummer}`;
            //       }
            //       return path;  // In case the path doesn't match the pattern, return it unchanged
            //     },
            //   },
            //   "/signatureControlv3": {
            //     target: "https://data.vcert.brreg.no",
            //     changeOrigin: true,
            //     secure: false,
            //     rewrite: (path) => {
            //       // Match the URL pattern /signatureControl/:orgNumber/:fodselsnummer
            //       const match = path.match(/^\/signatureControl\/(\d+)\/(\d+)$/);
            //       if (match) {
            //         const orgNumber = match[1];
            //         const fodselsnummer = match[2];
            //         // Rewrite the URL to the correct path
            //         return `/fullmakt/enheter/${orgNumber}/signatur/kontroll?fodselsnummer=${fodselsnummer}`;
            //       }
            //       return path;  // In case the path doesn't match, return it unchanged
            //     },
            //   },
            //   "/signatureControlv4": {
            //     target: "https://data.vcert.brreg.no",
            //     changeOrigin: true,
            //     secure: false,
            //     configure: (proxy, options) => {
            //       proxy.on('proxyReq', (proxyReq, req, res) => {
            //         const originalUrl = req.url;

            //         // Match the pattern /signatureControl/:orgNumber/:fodselsnummer
            //         const match = originalUrl.match(/^\/signatureControl\/(\d+)\/(\d+)$/);
            //         if (match) {
            //           const orgNumber = match[1];
            //           const fodselsnummer = match[2];

            //           // Rewrite the URL to the desired format
            //           const newUrl = `/fullmakt/enheter/${orgNumber}/signatur/kontroll?fodselsnummer=${fodselsnummer}`;

            //           // Set the new path to the proxy request
            //           proxyReq.path = newUrl;
            //         }
            //       });
            //     },
            //   },

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
