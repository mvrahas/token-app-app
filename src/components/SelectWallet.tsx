import { useWallet } from '@solana/wallet-adapter-react'

const SelectWallet = ()=>{

    const { wallets, select } = useWallet()

    return(
        <div>
            <p>Connect your wallet</p>
            <ul>
                {
                    wallets.map(
                        (wallet,i)=><li key={i}>
                            <button className='flex flex-row items-center cursor-pointer' onClick={async ()=>{
                                select(wallet.adapter.name)
                            }}>
                                <img className='w-10 h-10' src={wallet.adapter.icon}></img>
                                <span className='ml-2'>{wallet.adapter.name}</span>
                            </button>
                        </li>
                    )
                }
            </ul>
        </div>        
    )
}


export default SelectWallet