import { useState, useEffect } from 'react'
import api from '../functions/api'
import OnboardingMenu from "../components/OnboardingMenu"
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
const SOLANA_CLUSTER = import.meta.env.VITE_SOLANA_CLUSTER


const Dashboard = ()=>{


    const [transactions,setTransactions] = useState<Transaction[]>([])
    const [loaded,setLoaded] = useState(false)
    const get = async ()=>{
        try{
            const {data} = await api.get(`transaction/recent`)
            setTransactions(data)
        }catch(e){
            console.log(e)
        }
        setLoaded(true)
    }
    useEffect(()=>{get()},[])


    return(
        <div>
            {loaded ? <>
                {transactions.length 
                    ? 
                    <div className='rounded-lg bg-white shadow-sm'>
                        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                            <div className="-mt-2 -ml-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                                <div className="mt-2 ml-4">
                                    <h3 className="text-base font-semibold text-gray-900">Recent Payments</h3>
                                </div>
                            </div>
                        </div>
                        <ul role="list" className="divide-y divide-gray-100">
                          {transactions.map((transaction) => (
                            <li key={transaction._id} className="flex items-center justify-between gap-x-6 px-6 py-4">
                                <div className='flex flex-row items-center'>
                                    <div className={`flex items-center justify-center h-8 w-8 ${transaction.confirmed ? 'bg-green-200' :'bg-red-200'} rounded-full mr-5`}>
                                        {
                                            transaction.confirmed ? 
                                            <CheckIcon className='size-4 text-green-600'/> :
                                            <XMarkIcon className='size-4 text-red-600'/>
                                        }
                                    </div>
                                    <div className="min-w-0">
                                      <div className="flex items-start gap-x-3">
                                        <p className="text-sm/6 font-semibold text-gray-900">${transaction.amountUSDC/Math.pow(10,6)}</p>
                                      </div>
                                      <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
                                        <p className="whitespace-nowrap">
                                          {`Processed at ${transaction.processedAt.toString()}`}
                                        </p>
                                      </div>
                                    </div>
                                </div>
                                <div className="flex flex-none items-center gap-x-4">
                                    <a
                                        target="_blank"
                                        href={`https://explorer.solana.com/tx/${transaction.signature}${SOLANA_CLUSTER==='devnet'?'?cluster=devnet':''}`}
                                        className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:block cursor-pointer"
                                    >
                                      View
                                    </a>
                                </div>
                            </li>
                          ))}
                        </ul>
                    </div> : <OnboardingMenu/>
                }
            </> : null}
        </div>
    )
}


export default Dashboard