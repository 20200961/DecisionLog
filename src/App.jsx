import './App.css'
import AppRoutes from './routes/routes'
import { DecisionProvider } from './context/DecisionContext'
import { AuthProvider } from './context/AuthContext'


function App() {
  return (
    <AuthProvider>
      <DecisionProvider>
        <AppRoutes />
      </DecisionProvider>
    </AuthProvider>
  )
}

export default App