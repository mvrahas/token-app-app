import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { transferIn, transferOut } from '@numin/web-sdk'
import { BASE_URL } from "../functions/api"
import axios from "axios"


const Portal = ()=>{

    const {_id} = useParams()
    const [publicKey,setPublicKey] = useState(null)
    const [amount,setAmount] = useState(0)
    const [balance,setBalance] = useState(null)
    const [info,setInfo] = useState<PortalInfo|null>(null)
    const [expired,setExpired] = useState(false)

    const load = async ()=>{
        try{
            const response = await axios.get(
                `${BASE_URL}/portal`,
                {headers:{'Authorization':`Bearer ${_id}`}}
            )
            setInfo(response.data)
            setBalance(response.data.balance)
        }catch(e){
            setExpired(true)
            console.log('Something went wrong!')
        }
    }
    useEffect(()=>{load()},[])

    const connect = async ()=>{
      if(window.phantom){
          try {
            const response = await window.phantom.solana.connect()
            setPublicKey(response.publicKey.toString())
          } catch (e) {
            alert('Oops! Something went wrong. Please try again.')
          }
      }else{
        alert('Please install Phantom wallet.')
      }
    }

    const handleTransferIn = async ()=>{
      if(!_id || !publicKey){return}
      transferIn(_id,amount,publicKey,BASE_URL)
      .then(r=>setBalance(r.balance))
      .catch(e=>console.log(e))
    }

    const handleTransferOut = async ()=>{
      if(!_id || !publicKey){return}
      transferOut(_id,amount,publicKey,BASE_URL)
      .then(r=>setBalance(r.balance))
      .catch(e=>console.log(e))
    }

    const handleInput = (e : React.ChangeEvent<HTMLInputElement>)=>{
      const val = e.target.value
      setAmount(Number(val))
    }

    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        {info ? 
        <div className="flex flex-col p-6 items-center bg-white ring-1 shadow-xs ring-gray-900/5 rounded-xl">
            <div className="flex flex-col items-center mb-5">
              <img src={info.metadata.image} className="w-20 h-20 mb-3 border-5 border-gray-500 rounded-full shadow-lg"></img>
              <p className="text-base">{info.metadata.name}</p>
              {balance === null ? null : <p className="text-5xl font-semibold">{balance}</p>}
            </div>
            <div>
              <div className="flex flex-col items-center w-70 rounded-lg">
                {publicKey ? 
                <>
                  <div className="mb-2 w-full">
                    <div className="flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <input 
                        type='number' 
                        value={amount === 0 ? '' : amount} 
                        onChange={handleInput}
                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" 
                        placeholder="0.00"
                      />
                      <div id="price-currency" className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">{info ? info.metadata.symbol : null}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleTransferIn}
                    className="rounded-md w-full mb-2 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                  >
                    Transfer In
                  </button>
                  <button 
                    onClick={handleTransferOut}
                    className="rounded-md w-full mb-2 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                  >
                    Transfer Out
                  </button>
                </> 
                : 
                <>
                  <button 
                    onClick={connect}
                    className="rounded-md w-full mb-2 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                  >
                    Connect Wallet
                  </button>
                </>
                }
              </div>
              <p className="text-xs mt-2 text-gray-400 text-center">{`Link expires ${new Date(info.expiration).toLocaleTimeString()}`}</p>
            </div>
        </div> : null}
        {expired ? <p>Could not load portal</p> : null}
      </div>
    )
}

export default Portal