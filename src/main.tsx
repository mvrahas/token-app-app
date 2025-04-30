import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext'
import { WalletProvider } from './context/WalletContext'
import { BrowserRouter as Router } from 'react-router-dom'
import Loading from './pages/Loading.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <WalletProvider>
        <Loading>
          <Router>
            <App/>
          </Router>
        </Loading>
      </WalletProvider>
    </AuthProvider>
  </StrictMode>,
)
