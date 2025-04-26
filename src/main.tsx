import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext'
import { WalletProvider } from './context/WalletContext'
import { MintProvider } from './context/MintContext'
import { BrowserRouter as Router } from 'react-router-dom'
import Loading from './pages/Loading.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <WalletProvider>
        <MintProvider>
          <Loading>
            <Router>
              <App/>
            </Router>
          </Loading>
        </MintProvider>
      </WalletProvider>
    </AuthProvider>
  </StrictMode>,
)
