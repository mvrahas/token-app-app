import React, {useState, createContext} from 'react'
import { WalletProvider } from '@solana/wallet-adapter-react'
import { PhantomWalletAdapter, SolflareWalletAdapter, CoinbaseWalletAdapter } from '@solana/wallet-adapter-wallets'

const SolanaWalletContext = createContext<SolanaWalletContextType|null>(null)


//DELETE LATER
interface SolanaWalletContextType {
    publicKey : string|null,
    connect : ()=>void,
}
//^

export const SolanaWalletProvider : React.FC<Props> = ({children})=>{

    const wallets = [
        new PhantomWalletAdapter,
        new SolflareWalletAdapter,
        new CoinbaseWalletAdapter,
    ]

    //DELETE LATER
    const [publicKey,setPublicKey] = useState(null)
    const connect = async ()=>{}
    //^

    return(
        <SolanaWalletContext.Provider value={{
            publicKey,
            connect,
        }}>
            <WalletProvider wallets={wallets}>
                {children}
            </WalletProvider>
        </SolanaWalletContext.Provider>
    )
}

export default SolanaWalletContext