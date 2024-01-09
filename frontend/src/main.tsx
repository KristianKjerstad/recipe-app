import { ThemeProvider } from '@mui/material/styles'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { Header } from './components/Header.tsx'
import './index.css'
import { theme } from './styling/mui.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Header />
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
)
