import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext'
import SolanaWalletAdapter from './components/SolanaWalletAdapter.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import Loading from './pages/Loading.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <SolanaWalletAdapter>
        <Loading>
          <Router>
            <App/>
          </Router>
        </Loading>
      </SolanaWalletAdapter>
    </AuthProvider>
  </StrictMode>,
)
