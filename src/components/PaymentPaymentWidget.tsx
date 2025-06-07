import React from "react"
import DropdownMenu from "../components/DropdownMenu"
import { StarIcon } from '@heroicons/react/16/solid'


interface PaymentPaymentWidgetProps {
    info : PaymentPortalInfo,
    connected : boolean,
    pay : Function,
    connect : Function,
    setActiveView : Function,
    tokenAmount : number,
    setTokenAmount : Function,
    loading : boolean,
    processing : boolean,
}


const PaymentPaymentWidget : React.FC<PaymentPaymentWidgetProps> = ({info,connected,pay,connect,setActiveView,tokenAmount,setTokenAmount,loading,processing})=>{

    return(
        <div className="flex flex-col items-center w-full sm:max-w-82 mt-3 sm:mt-12">
        
        
                        <div className="flex flex-col items-center w-full mb-3 p-5 bg-white ring-1 shadow-xs ring-gray-900/5 rounded-xl">


                            <div className="flex flex-col items-center mb-10 mt-4">
                                <p className="text-md mb-1">Amount Due</p>
                                <label className="text-3xl font-bold mb-1.5">${(info.amountUSD - (info.token ?(tokenAmount*info.token.tokenUSDValue):0)).toFixed(2)}</label>
                                {tokenAmount ? <label className="text-xs text-red-500 mb-2">+{tokenAmount} {info.token.metadata.symbol}</label> : null}
                                <div className="text-xs p-1 rounded-sm bg-gray-200">{info.name}</div>
                            </div>


                            <div className="w-full mb-2">
                                <DropdownMenu/>
                            </div>


                            {tokenAmount ?

                            <div className="w-full mb-2 p-4 bg-black rounded-lg flex flex-row items-center justify-between">
                                <div className="flex flex-row items-center">
                                    <StarIcon
                                        className="size-5 text-gray-500"
                                    />
                                    <p className="text-sm text-white ml-2">{info.token.metadata.name}</p>
                                </div>
                                <div className="flex flex-row items-center">
                                    <p className="text-xs text-gray-400 mr-2">{info.token.metadata.symbol}</p>
                                    <img className="h-8 w-8 rounded-full" src={info.token.metadata.image}/>
                                </div>
                            </div>

                            : null}
            
                            
                            <div className="h-6"></div>


                        {info.token ?
                        <>
                            {tokenAmount ? 
                                <div className="w-full mt-2">
                                    <button 
                                        onClick={()=>setTokenAmount(0)}
                                        className="flex w-full justify-center rounded-md bg-gray-200 px-3 py-1.5 text-sm/6 font-semibold text-black shadow-xs hover:bg-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                                    >
                                        - Remove
                                    </button>
                                </div>
                                : 
                                <div className="w-full mt-2">
                                    <button 
                                        onClick={()=>setActiveView('redemption')}
                                        className="flex w-full justify-center rounded-md bg-gray-200 px-3 py-1.5 text-sm/6 font-semibold text-black shadow-xs hover:bg-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                                    >
                                        + Redeem
                                    </button>
                                </div>
                            }
                        </>
                        : null}
                            


                            


                        {connected ? 
                            <div className="w-full mt-2">
                                <button 
                                    onClick={()=>pay(info.sandbox)}
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                                >
                                    {processing ? 'Processing...' : loading ? 'Loading...' : 'Pay'}
                                </button>
                            </div>
                            : 
                            <div className="w-full mt-2">
                                <button 
                                    onClick={()=>connect()}
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                                >
                                    Connect Wallet
                                </button>
                            </div>
                        }




        
                        </div>
        
        
        
                    </div>
    )   
}

export default PaymentPaymentWidget