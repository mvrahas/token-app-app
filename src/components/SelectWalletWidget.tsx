import { useWallet } from '@solana/wallet-adapter-react'

const SelectWalletWidget = ()=>{

    const { wallets, select } = useWallet()

    return(
        <div className="flex flex-col items-center w-full sm:max-w-82 mt-3 sm:mt-12">
            <div className="flex flex-col items-center w-full mb-3 p-5 bg-white ring-1 shadow-xs ring-gray-900/5 rounded-xl">
                <p className='font-medium my-2'>Select a wallet to continue</p>
                <ul className='w-full'>
                    {
                        wallets.map(
                            (wallet,i)=><li className="mt-4" key={i}>
                                <button className='flex flex-row w-full items-center justify-between cursor-pointer' onClick={async ()=>{
                                    select(wallet.adapter.name)
                                }}>
                                    <div className='flex flex-row items-center'>
                                        <img className='w-10 h-10 rounded-full' src={wallet.adapter.icon}></img>
                                        <span className='ml-3'>{wallet.adapter.name}</span>
                                    </div>
                                    {wallet.adapter.name === 'Phantom' ? <span className='text-xs text-gray-400'>Recommended</span> : null}
                                </button>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>        
    )
}


export default SelectWalletWidget