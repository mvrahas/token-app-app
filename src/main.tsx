import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext'
import { AnalyticsProvider } from './context/AnalyticsContext.tsx'
import SolanaWalletAdapter from './components/SolanaWalletAdapter.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import Loading from './pages/Loading.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AnalyticsProvider>
      <AuthProvider>
        <SolanaWalletAdapter>
          <Loading>
            <Router>
              <App/>
            </Router>
          </Loading>
        </SolanaWalletAdapter>
      </AuthProvider>
    </AnalyticsProvider>
  </StrictMode>,
)
