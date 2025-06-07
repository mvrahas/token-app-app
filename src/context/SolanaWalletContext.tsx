import React, { useState, useMemo, createContext } from 'react'
import { clusterApiUrl } from '@solana/web3.js'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { PhantomWalletAdapter, SolflareWalletAdapter, CoinbaseWalletAdapter } from '@solana/wallet-adapter-wallets'
const VITE_SOLANA_CLUSTER = import.meta.env.VITE_SOLANA_CLUSTER


const SolanaWalletContext = createContext<SolanaWalletContextType|null>(null)


//DELETE LATER
interface SolanaWalletContextType {
    publicKey : string|null,
    connect : ()=>void,
}
//^

export const SolanaWalletProvider : React.FC<Props> = ({children})=>{

    const network = VITE_SOLANA_CLUSTER === 'mainnet' ? WalletAdapterNetwork.Mainnet : WalletAdapterNetwork.Devnet
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

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
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets}>
                    {children}
                </WalletProvider>
            </ConnectionProvider>
        </SolanaWalletContext.Provider>
    )
}

export default SolanaWalletContext