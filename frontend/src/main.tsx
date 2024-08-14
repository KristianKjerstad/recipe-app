import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { ThemeProvider } from '@mui/material/styles'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { Footer } from './components/Footer.tsx'
import { Header } from './components/Header.tsx'
import './index.css'
import { theme } from './styling/mui.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <ErrorBoundary fallback={<div>Error...</div>}>
                    <MantineProvider>
                        <div className="flex flex-col min-h-screen">
                            <div className="flex-grow">
                                <Header />
                                <App />
                            </div>
                            <Footer />
                        </div>
                    </MantineProvider>
                </ErrorBoundary>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
)
