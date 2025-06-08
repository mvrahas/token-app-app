import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { txConvert } from "@numin/web-sdk"
import axios from "axios"
export const BASE_URL = import.meta.env.VITE_BASE_URL


import PaymentPaymentWidget from "../components/PaymentPaymentWidget"
import PaymentRedemptionWidget from "../components/PaymentRedemptionWidget"
import PaymentConfirmationWidget from "../components/PaymentConfirmationWidget"
import PaymentErrorWidget from "../components/PaymentErrorWidget"
import SelectWalletWidget from "../components/SelectWalletWidget"


const PaymentPortal = ()=>{


    const {_id} = useParams()
    const [activeView,setActiveView] = useState('payment')
    const [loading,setLoading] = useState(false)
    const [processing,setProcessing] = useState(false)
    const [tokenAmount,setTokenAmount] = useState(0)
    const {publicKey,connect,connected,wallet,sendTransaction} = useWallet()
    const { connection } = useConnection()


    //load info
    const [info, setInfo] = useState<PaymentPortalInfo|null>(null)
    const load = async ()=>{
        try{
            const response = await axios.get(
                `${BASE_URL}/payment`,
                {headers:{'Authorization':`Bearer ${_id}`}}
            )
            setInfo(response.data)
            setActiveView(
                response.data.confirmed ? 'confirmation' 
                : response.data.processed && !response.data.confirmed ? 'error' 
                : 'payment'
            )
        }catch(e){
            console.log('Something went wrong!')
        }
    }
    useEffect(()=>{load()},[])


    //make purchase
    const pay = async (sandbox : boolean)=>{


        setLoading(true)
        try{

            if(!publicKey){throw Error('Something went wrong!')}

            //create tx
            const createResponse = await axios.post(
                `${BASE_URL}/payment/create`,
                {wallet:publicKey.toString(),amountToken:tokenAmount},
                {headers:{'Authorization':`Bearer ${_id}`}}
            )
            const transaction = txConvert(createResponse.data.base64Transaction)

            //get tx signature
            let signature = null
            if(!sandbox){
                signature = await sendTransaction(transaction,connection)
            }

            //confirm tx
            setProcessing(true)
            try{
                await axios.post(
                    `${BASE_URL}/payment/process`,
                    {signature},
                    {headers:{'Authorization':`Bearer ${_id}`}}
                )
                setActiveView('confirmation')
            }catch{
                setActiveView('error')
            }
            setProcessing(false)

        }catch(e){
            console.log(e)
        }
        setLoading(false)
    }

    
    return(
        <div className="flex flex-col items-center h-screen bg-gray-50">

            {info ? <>
                {
                    !wallet ? <SelectWalletWidget/> :
                    activeView === 'payment' ? 
                        <PaymentPaymentWidget 
                            info={info} 
                            connected={connected}
                            pay={pay} 
                            connect={connect}
                            setActiveView={setActiveView}
                            tokenAmount={tokenAmount}
                            setTokenAmount={setTokenAmount}
                            loading={loading}
                            processing={processing}
                        /> : 
                    activeView === 'redemption' ? 
                        <PaymentRedemptionWidget 
                            info={info}
                            setActiveView={setActiveView}
                            setTokenAmount={setTokenAmount}
                        />  : 
                    activeView === 'confirmation' ? 
                        <PaymentConfirmationWidget
                            info={info}
                        /> :
                    activeView === 'error' ? 
                        <PaymentErrorWidget
                            info={info}
                        />
                    : null
                }
                {
                    info.sandbox ? <div className="w-full sm:max-w-82 border-l-4 border-yellow-400 bg-yellow-50 p-4">
                        <div className="flex">
                            <div className="shrink-0">
                                <svg className="size-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-yellow-700">
                                  Sandbox mode is activated. This portal is for testing purposes only.
                                </p>
                            </div>
                        </div>
                    </div>  : null
                }
            </> : null}

        </div>
    )
}


export default PaymentPortal