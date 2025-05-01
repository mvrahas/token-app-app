import DropdownMenu from "../components/DropdownMenu"
import { XMarkIcon } from '@heroicons/react/16/solid'
import useWallet from "../hooks/useWallet"
import { txConvert } from "@numin/web-sdk"
import axios from "axios"
export const BASE_URL = import.meta.env.VITE_BASE_URL


const PaymentPortal = ()=>{

    const {publicKey,connect} = useWallet()
    const _id = '6813e21dc19152a18a93a3b6'

    //make purchase
    const pay = async ()=>{

        try{

            //create gift tx
            const createResponse = await axios.post(
                `${BASE_URL}/transaction/payment/create`,
                {wallet:publicKey,amountUSD:.02,amountToken:0},
                {headers:{'Authorization':`Bearer ${_id}`}}
            )

            console.log(createResponse)

            //deserialize and send transaction
            const transaction = txConvert(createResponse.data.base64Transaction)
            const {signature} = await window.phantom.solana.signAndSendTransaction(transaction)

            console.log(signature)

        }catch(e){
            console.log('Something went wrong')
        }
    }

    return(
        <div className="flex flex-col items-center h-screen bg-gray-50">

                    <div className="flex flex-col items-center w-full sm:max-w-82 mt-3 sm:mt-12">
        
        
                        <div className="flex flex-col items-center w-full mb-3 p-5 bg-white ring-1 shadow-xs ring-gray-900/5 rounded-xl">


                            <div className="flex flex-col items-center mb-10 mt-4">
                                <p className="text-md mb-1">Amount Due</p>
                                <label className="text-3xl font-bold mb-1.5">$84.50</label>
                                <div className="text-xs p-1 rounded-sm bg-gray-200">Great Oak</div>
                            </div>



                            <DropdownMenu/>



                            <div className="w-full mt-2 mb-5 p-4 bg-black rounded-lg flex flex-row items-center justify-between">
                                <div className="flex flex-row items-center">
                                    <XMarkIcon
                                        className="size-5 text-gray-500"
                                    />
                                    <p className="text-sm text-white ml-2">Coffee Beans</p>
                                </div>
                                <div className="flex flex-row items-center">
                                    <p className="text-xs text-gray-400 mr-2">CBX</p>
                                    <img className="h-8 w-8 rounded-full" src={'/token-icon-cbx.png'}/>
                                </div>
                            </div>
                            



                            
                            <div className="w-full mt-2">
                                <button 
                                    onClick={()=>console.log('redeem')}
                                    className="flex w-full justify-center rounded-md bg-gray-200 px-3 py-1.5 text-sm/6 font-semibold text-black shadow-xs hover:bg-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                                >
                                    + Redeem
                                </button>
                            </div>


                            {publicKey ? 
                            <div className="w-full mt-2">
                                <button 
                                    onClick={pay}
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                                >
                                    Pay with ur wallet
                                </button>
                            </div>
                            : 
                            <div className="w-full mt-2">
                                <button 
                                    onClick={connect}
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                                >
                                    Connect Wallet
                                </button>
                            </div>
                            }




        
                        </div>
        
        
        
                    </div>

                </div>
    )
}
export default PaymentPortal