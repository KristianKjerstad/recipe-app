import { Route, Routes } from 'react-router-dom'
import { DrinksRecipesPage } from './pages/DrinksRecipesPage'
import { ErrorPage } from './pages/ErrorPage'
import { HomePage } from './pages/homePage'

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/drinks" element={<DrinksRecipesPage />} />
            <Route path="*" element={<ErrorPage />} />
            {/* <Route path="/logout" element={<LogoutPage />} />
            <Route path="/" element={<AuthenticatedLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/customers/" element={<CustomerPage />} />
                <Route
                    path="/customers/:id"
                    element={<CustomerDetailsPage />}
                />
                <Route path="/carers/" element={<CarersPage />} />
                <Route path="/carers/:id" element={<CarerDetailsPage />} />
                <Route path="/visits/" element={<VisitsPage />} />
                <Route path="/visits/:id" element={<VisitDetailsPage />} />
                <Route path="/assistance/" element={<VideoAssistancePage />} />
                <Route path="*" element={<ErrorPage />} />
            </Route> */}
        </Routes>
    )
}

export default App
