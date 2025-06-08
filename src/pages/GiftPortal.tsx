import { useState, useEffect, FormEvent, ChangeEvent } from "react"
import { useParams } from "react-router-dom"
import { Radio, RadioGroup } from '@headlessui/react'
import { ChevronUpIcon, ChevronDownIcon } from '../components/ChevronIcons'
import SelectWalletWidget from "../components/SelectWalletWidget"
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import axios from "axios"
import { txConvert } from "@numin/web-sdk"
import { BASE_URL } from "../functions/api"



const GiftPortal = ()=>{
    

    const {_id} = useParams()
    const {publicKey,connect,connected,wallet,sendTransaction} = useWallet()
    const { connection } = useConnection()
    const priceOptions = [5,10,20,50,100]

    const [price, setPrice] = useState(priceOptions[0])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [menuOpen,setMenuOpen] = useState(false)
    const [successMessage,setSuccessMessage] = useState(false)


    //load info
    const [info, setInfo] = useState<GiftPortalInfo|null>(null)
    const load = async ()=>{
        try{
            const response = await axios.get(
                `${BASE_URL}/gift/metadata`,
                {headers:{'Authorization':`Bearer ${_id}`}}
            )
            setInfo(response.data)
        }catch(e){
            console.log('Something went wrong!')
        }
    }
    useEffect(()=>{load()},[])



    //make purchase
    const purchase = async (e: FormEvent<HTMLFormElement>)=>{

        e.preventDefault()

        try{

            if(!publicKey){throw new Error('Not connected!')}

            //create gift tx
            const createResponse = await axios.post(
                `${BASE_URL}/gift/tx/create`,
                {amountUSD:price,firstName,lastName,email,wallet:publicKey.toString()},
                {headers:{'Authorization':`Bearer ${_id}`}}
            )

            //deserialize and send transaction
            const transaction = txConvert(createResponse.data.base64Transaction)
            const signature = await sendTransaction(transaction,connection)

            //process gift tx
            const processResponse = await axios.post(
                `${BASE_URL}/gift/tx/process`,
                {signature},
                {headers:{'Authorization':`Bearer ${createResponse.data.giftId}`}}
            )

            console.log(processResponse)
            setSuccessMessage(true)

        }catch(e){
            console.log('Something went wrong')
        }
    }

    
    return(
        <div className="flex flex-col items-center h-screen bg-gray-50">

            {!wallet ? <SelectWalletWidget/> : info ?
            <div className="flex flex-col items-center w-full sm:max-w-82 mt-3 sm:mt-12">


                <div className="flex flex-col items-center w-full mb-3 p-5 bg-white ring-1 shadow-xs ring-gray-900/5 rounded-xl">
                      
                    <div className="w-full p-4 bg-black rounded-lg flex flex-row items-center justify-between">
                        <p className="text-md text-white">{info.metadata.name}</p>
                        <div className="flex flex-row items-center">
                            <p className="text-xs text-gray-400 mr-2">{price/info.tokenUSDValue} {info.metadata.symbol}</p>
                            <img className="h-8 w-8 rounded-full" src={info.metadata.image}/>
                        </div>
                    </div>

                    <form onSubmit={purchase} className="w-full">
                        
                        <div className="w-full">
                            <fieldset>
                                <RadioGroup value={price} onChange={setPrice} className="mt-3 grid grid-cols-5 gap-3">
                                  {priceOptions.map((option) => (
                                    <Radio
                                      key={option}
                                      value={option}
                                      disabled={false}
                                      className={
                                        'cursor-pointer focus:outline-hidden flex items-center justify-center rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 uppercase ring-1 ring-gray-300 not-data-focus:not-data-checked:ring-inset hover:bg-gray-50 data-checked:bg-indigo-600 data-checked:text-white data-checked:ring-0 data-checked:hover:bg-indigo-500 data-focus:ring-2 data-focus:ring-indigo-600 data-focus:ring-offset-2 data-focus:data-checked:ring-2 sm:flex-1'
                                      }
                                    >
                                      ${option}
                                    </Radio>
                                  ))}
                                </RadioGroup>
                            </fieldset>
                        </div>

                        <div className="w-full mt-3 -space-y-px">
                            <div className="rounded-t-md bg-white px-3 pt-2.5 pb-1.5 outline-1 -outline-offset-1 outline-gray-300 focus-within:relative focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                <label htmlFor="firstName" className="block text-xs font-medium text-gray-900">First Name</label>
                                <input 
                                    type="text" 
                                    name="firstName" 
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e:ChangeEvent<HTMLInputElement>)=>{setFirstName(e.target.value)}}
                                    className="block w-full text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" 
                                    placeholder="Paul"
                                    required
                                />
                            </div>
                            <div className="bg-white px-3 pt-2.5 pb-1.5 outline-1 -outline-offset-1 outline-gray-300 focus-within:relative focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                <label htmlFor="lastName" className="block text-xs font-medium text-gray-900">Last Name</label>
                                <input 
                                    type="text" 
                                    name="lastName" 
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e:ChangeEvent<HTMLInputElement>)=>{setLastName(e.target.value)}} 
                                    className="block w-full text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" 
                                    placeholder="McCartney"
                                    required
                                />
                            </div>
                            <div className="rounded-b-md bg-white px-3 pt-2.5 pb-1.5 outline-1 -outline-offset-1 outline-gray-300 focus-within:relative focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                <label htmlFor="email" className="block text-xs font-medium text-gray-900">Email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email"
                                    value={email}
                                    onChange={(e:ChangeEvent<HTMLInputElement>)=>{setEmail(e.target.value)}}  
                                    className="block w-full text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" 
                                    placeholder="pmccartney@gmail.com"
                                    required
                                />
                            </div>
                        </div>

                        {connected ?
                        <div className="w-full mt-3">
                            <button 
                                type="submit" 
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                            >
                                Buy with USDC
                            </button>
                        </div>
                        : null}

                    </form>
                    
                    {!connected ?
                    <div className="w-full mt-3">
                        <button 
                            onClick={connect}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                        >
                            Connect Wallet
                        </button>
                    </div>
                    : null}

                </div>


                <div className="flex flex-col items-center w-full mb-3 bg-white ring-1 shadow-xs ring-gray-900/5 rounded-xl">
                    <button onClick={()=>setMenuOpen(!menuOpen)} className="w-full flex flex-row p-5 items-center justify-between cursor-pointer">
                        <p className="text-sm font-medium">About this token</p>
                        {menuOpen ? <ChevronUpIcon/> : <ChevronDownIcon/>}
                    </button>
                    {menuOpen ? <p className="text-sm px-5 pb-5">{info.metadata.description}</p> : null}
                </div>

                {successMessage ?
                <div className="bg-green-200 p-2 rounded-md">
                    <p className="text-xs text-green-800">Transfer confirmed 🎉</p>
                </div>
                : null}


            </div>
            : null}
        </div>
    )
}

export default GiftPortal