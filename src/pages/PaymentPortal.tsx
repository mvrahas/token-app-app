import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import useWallet from "../hooks/useWallet"
import { txConvert } from "@numin/web-sdk"
import axios from "axios"
export const BASE_URL = import.meta.env.VITE_BASE_URL

import PaymentPaymentWidget from "../components/PaymentPaymentWidget"
import PaymentRedemptionWidget from "../components/PaymentRedemptionWidget"
import PaymentConfirmationWidget from "../components/PaymentConfirmationWidget"
import PaymentErrorWidget from "../components/PaymentErrorWidget"

const PaymentPortal = ()=>{


    const {_id} = useParams()
    const [activeView,setActiveView] = useState('payment')
    const [loading,setLoading] = useState(false)
    const [processing,setProcessing] = useState(false)
    const [tokenAmount,setTokenAmount] = useState(0)
    const {publicKey,connect} = useWallet()


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
    const pay = async ()=>{

        setLoading(true)
        try{

            //create tx
            const createResponse = await axios.post(
                `${BASE_URL}/payment/create`,
                {wallet:publicKey,amountToken:tokenAmount},
                {headers:{'Authorization':`Bearer ${_id}`}}
            )

            //deserialize and send transaction
            const transaction = txConvert(createResponse.data.base64Transaction)
            const {signature} = await window.phantom.solana.signAndSendTransaction(transaction)

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
                    activeView === 'payment' ? 
                        <PaymentPaymentWidget 
                            info={info} 
                            publicKey={publicKey} 
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
            </> : null}

        </div>
    )
}


export default PaymentPortal