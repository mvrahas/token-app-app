import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import useWallet from "../hooks/useWallet"
import { txConvert } from "@numin/web-sdk"
import axios from "axios"
export const BASE_URL = import.meta.env.VITE_BASE_URL

import PaymentPaymentWidget from "../components/PaymentPaymentWidget"
import PaymentRedemptionWidget from "../components/PaymentRedemptionWidget"

const PaymentPortal = ()=>{


    const {_id} = useParams()
    const [activeView,setActiveView] = useState('payment')
    const [tokenAmount,setTokenAmount] = useState(0)
    const tokenUSDValue = .01
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
        }catch(e){
            console.log('Something went wrong!')
        }
    }
    useEffect(()=>{load()},[])


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
                        tokenUSDValue={tokenUSDValue}
                    /> : 
                    activeView === 'redemption' ? 
                    <PaymentRedemptionWidget 
                        info={info}
                        setActiveView={setActiveView}
                        tokenAmount={tokenAmount}
                        setTokenAmount={setTokenAmount}
                        tokenUSDValue={tokenUSDValue}
                    />  : 
                    null
                }
            </> : null}

        </div>
    )
}


export default PaymentPortal