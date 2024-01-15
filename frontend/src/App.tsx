import { ErrorBoundary } from 'react-error-boundary'
import { Route, Routes } from 'react-router-dom'
import { DrinksRecipesPage } from './pages/DrinksRecipesPage'
import { ErrorPage } from './pages/ErrorPage'
import { FoodRecipesPage } from './pages/FoodRecipesPage'
import { RecipePage } from './pages/RecipePage'
import { HomePage } from './pages/homePage'

function Fallback({
    error,
    resetErrorBoundary,
}: {
    error: Error
    resetErrorBoundary: () => void
}) {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.

    console.error(error)

    let errorMessage = error.message
    if ('response' in error) {
        errorMessage = error?.response?.data.detail
    }

    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre style={{ color: 'red' }}>{errorMessage}</pre>
        </div>
    )
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
                path="/drinks"
                element={
                    <ErrorBoundary fallback={<div>Error in recipe page</div>}>
                        <DrinksRecipesPage />
                    </ErrorBoundary>
                }
            />
            <Route
                path="/food"
                element={
                    <ErrorBoundary FallbackComponent={Fallback}>
                        <FoodRecipesPage />
                    </ErrorBoundary>
                }
            />
            <Route
                path="/recipe/:id"
                element={
                    <ErrorBoundary FallbackComponent={Fallback}>
                        <RecipePage />
                    </ErrorBoundary>
                }
            />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}

export default App
