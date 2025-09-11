import React, { useMemo } from 'react'
import { clusterApiUrl } from '@solana/web3.js'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { SolflareWalletAdapter, CoinbaseWalletAdapter, NightlyWalletAdapter } from '@solana/wallet-adapter-wallets'
const VITE_SOLANA_CLUSTER = import.meta.env.VITE_SOLANA_CLUSTER


export const SolanaWalletProvider : React.FC<Props> = ({children})=>{

    const network = VITE_SOLANA_CLUSTER === 'mainnet' ? WalletAdapterNetwork.Mainnet : WalletAdapterNetwork.Devnet
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = [
        new SolflareWalletAdapter,
        new CoinbaseWalletAdapter,
        new NightlyWalletAdapter,
    ]

    return(
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
                {children}
            </WalletProvider>
        </ConnectionProvider>
    )
}


export default SolanaWalletProvider