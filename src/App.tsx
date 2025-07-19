import './App.css'
import { Routes, Route } from 'react-router-dom'
import Locked from './components/Locked'
import Dashboard from './pages/Dashboard'
import TransferSend from './pages/TransferSend'
import TransferReceive from './pages/TransferReceive'
import Mint from './pages/Mint'
import Mints from './pages/Mints'
import Settings from './pages/Settings'
import CreateMint from './pages/CreateMint'
import AuthLogin from './pages/AuthLogin'
import AuthRegister from './pages/AuthRegister'
import CompleteSetup from './pages/CompleteSetup'
import AuthChange from './pages/AuthChange'
import AuthReset from './pages/AuthReset'
import AuthResetMessage from './pages/AuthResetMessage'
import BillingSuccess from './pages/BillingSuccess'
import BillingSubscriptions from './pages/BillingSubscriptions'
import GiftPortal from './pages/GiftPortal'
import PaymentPortal from './pages/PaymentPortal'
import Test from './pages/Test'
import UI from './components/UI'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/auth/login" element={<AuthLogin/>}/>
        <Route path="/auth/register" element={<AuthRegister/>}/>
        <Route path="/setup" element={<CompleteSetup/>}/>
        <Route path="/auth/reset" element={<AuthReset/>}/>
        <Route path="/auth/reset/message" element={<AuthResetMessage/>}/>
        <Route path="/auth/change/:resetId" element={<AuthChange/>}/>
        <Route path="/" element={<Locked><UI><Dashboard/></UI></Locked>}/>
        <Route path="/send" element={<Locked><UI><TransferSend/></UI></Locked>}/>
        <Route path="/receive" element={<Locked><UI><TransferReceive/></UI></Locked>}/>
        <Route path="/mint" element={<Locked><UI><Mints/></UI></Locked>}/>
        <Route path="/settings" element={<Locked><UI><Settings/></UI></Locked>}/>
        <Route path="/mint/create" element={<Locked><UI><CreateMint/></UI></Locked>}/>
        <Route path="/mint/manage/:_id" element={<Locked><UI><Mint/></UI></Locked>}/>
        <Route path="/billing/subscriptions" element={<Locked><UI><BillingSubscriptions/></UI></Locked>}/>
        <Route path="/billing/success" element={<Locked><BillingSuccess/></Locked>}/>
        <Route path="/portal/gift/:_id" element={<GiftPortal/>}/>
        <Route path="/portal/payment/:_id" element={<PaymentPortal/>}/>
        <Route path="/test" element={<Test/>}/>
      </Routes>
    </div>
  )
}


export default App