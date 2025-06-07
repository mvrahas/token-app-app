import { useWallet } from '@solana/wallet-adapter-react'
import SelectWallet from '../components/SelectWallet.tsx'

const Test = ()=>{

    const { wallet, connected, publicKey } = useWallet()

    console.log(connected)
    console.log(publicKey)

    return(
        <div>
            {
                wallet ? <p>Has wallet</p> : <SelectWallet/>
            }
        </div>
    )
}

export default Test