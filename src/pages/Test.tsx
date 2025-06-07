import { useWallet } from '@solana/wallet-adapter-react'
import SelectWalletWidget from '../components/SelectWalletWidget.tsx'

const Test = ()=>{

    const { wallet, connected, publicKey } = useWallet()

    console.log(connected)
    console.log(publicKey)

    return(
        <div>
            {
                wallet ? <p>Has wallet</p> : <SelectWalletWidget/>
            }
        </div>
    )
}

export default Test