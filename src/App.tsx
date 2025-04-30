import './App.css'
import { Routes, Route } from 'react-router-dom'
import Locked from './components/Locked'
import Mint from './pages/Mint'
import Sales from './pages/Sales'
import MintKeys from './pages/MintKeys'
import MintEmpty from './pages/MintEmpty'
import CreateMint from './pages/CreateMint'
import AuthLogin from './pages/AuthLogin'
import CompleteSetup from './pages/CompleteSetup'
import AuthChange from './pages/AuthChange'
import AuthReset from './pages/AuthReset'
import AuthResetMessage from './pages/AuthResetMessage'
import BillingSuccess from './pages/BillingSuccess'
import BillingSubscriptions from './pages/BillingSubscriptions'
import BillingPayments from './pages/BillingPayments'
import Portal from './pages/Portal'
import GiftPortal from './pages/GiftPortal'
import PaymentPortal from './pages/PaymentPortal'
import UI from './components/UI'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/auth/login" element={<AuthLogin/>}/>
        <Route path="/setup" element={<CompleteSetup/>}/>
        <Route path="/auth/reset" element={<AuthReset/>}/>
        <Route path="/auth/reset/message" element={<AuthResetMessage/>}/>
        <Route path="/auth/change/:resetId" element={<AuthChange/>}/>
        <Route path="/" element={<Locked><UI><MintEmpty/></UI></Locked>}/>
        <Route path="/overview" element={<Locked><UI><Mint/></UI></Locked>}/>
        <Route path="/sales" element={<Locked><UI><Sales/></UI></Locked>}/>
        <Route path="/developer" element={<Locked><UI><MintKeys/></UI></Locked>}/>
        <Route path="/create" element={<Locked><UI><CreateMint/></UI></Locked>}/>
        <Route path="/billing/subscriptions" element={<Locked><UI><BillingSubscriptions/></UI></Locked>}/>
        <Route path="/billing/success" element={<Locked><BillingSuccess/></Locked>}/>
        <Route path="/billing/payments" element={<Locked><BillingPayments/></Locked>}/>
        <Route path="/portal/:_id" element={<Portal/>}/>
        <Route path="/portal/gift/:_id" element={<GiftPortal/>}/>
        <Route path="/portal/payment" element={<PaymentPortal/>}/>
      </Routes>
    </div>
  )
}


export default App