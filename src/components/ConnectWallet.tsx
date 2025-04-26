import useWallet from '../hooks/useWallet'
import { WalletIcon } from '@heroicons/react/24/outline'

const ConnectWallet = ()=>{
    const {publicKey,connect} = useWallet()
    return(
        <>
            {publicKey ? 
                <div className='flex flex-col rounded-lg bg-gray-800 p-4'>
                    <span className='text-sm font-semibold text-gray-400'>Connected</span>
                    <span className='text-xs text-gray-400 overflow-hidden text-ellipsis'>{`${publicKey}...`}</span>  
                </div>
                : 
                <button
                    onClick={connect}
                    className="flex flex-row items-center w-full rounded-lg p-4 text-sm font-semibold text-gray-400 cursor-pointer hover:bg-gray-800 hover:text-white"
                >
                    <WalletIcon aria-hidden="true" className="size-6 shrink-0" />
                    <span className='ml-2'>Connect Wallet</span>
                </button>
            }
        </>
        
    )
}
export default ConnectWallet