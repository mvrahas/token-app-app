import { useContext } from 'react'
import SolanaWalletContext from '../context/SolanaWalletContext'

const useWallet = ()=>{
    const context = useContext(SolanaWalletContext)
    if(!context){
        throw new Error("Must be used within a provider")
    }
    return context
}

export default useWallet