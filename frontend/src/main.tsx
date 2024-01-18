import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import { ThemeProvider } from '@mui/material/styles'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { Header } from './components/Header.tsx'
import './index.css'
import TelemetryProvider from './providers/TelemetryProvider.tsx'
import { theme } from './styling/mui.ts'
import { getAppInsights } from './utils/telemetryService.ts'

let appInsights: null | ApplicationInsights = null

console.log('key', import.meta.env.VITE_INSTRUMENTATION_KEY)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <TelemetryProvider
                instrumentationKey={import.meta.env.VITE_INSTRUMENTATION_KEY}
                after={() => {
                    appInsights = getAppInsights()
                }}
            >
                <ThemeProvider theme={theme}>
                    <ErrorBoundary fallback={<div>Error...</div>}>
                        <Header />
                        <App />
                    </ErrorBoundary>
                </ThemeProvider>
            </TelemetryProvider>
        </BrowserRouter>
    </React.StrictMode>
)
