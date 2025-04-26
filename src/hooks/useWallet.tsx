import { useContext } from 'react'
import WalletContext from '../context/WalletContext'

const useWallet = ()=>{
    const context = useContext(WalletContext)
    if(!context){
        throw new Error("Must be used within a provider")
    }
    return context
}

export default useWallet