import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import api from '../functions/api'
import getBalance from '../functions/getBalance'
import GridCard from '../components/GridCard'
import AddressLink from '../components/AddressLink'
import InputButton from '../components/InputButton'
import { DocumentDuplicateIcon } from '@heroicons/react/20/solid'

const SOLANA_CLUSTER = import.meta.env.VITE_SOLANA_CLUSTER

const Mint = ()=>{

    const {_id} = useParams()
    const [mint,setMint] = useState<Mint|null>(null)

    //portal url
    const [copied,setCopied] = useState(false)
    const portalURL = `${window.location.origin}/portal/gift/${_id}`
    const copy = ()=>{
        if(portalURL){
            navigator.clipboard.writeText(portalURL)
            setCopied(true)
        }
    }   

    //mint info
    const getMint = ()=>{
        api.get(`/mint?_id=${_id}`)
        .then(r=>setMint(r.data))
        .catch(e=>console.log(e))
    }
    useEffect(getMint,[_id])

    //mint balance
    const [balance,setBalance] = useState<Balance|null>(null)
    const [refresh,setRefresh] = useState(0)
    const updateBalance = ()=>{
        if(!mint){return}
        getBalance('devnet',mint.account)
        .then(r=>setBalance(r))
        .catch(e=>console.log(e))
    }
    useEffect(updateBalance,[mint,_id,refresh])

    //mint new tokens
    const mintTokens = (amount:number)=>{
        return api.post('/mint/mint',{
            mintId:_id,
            amount
        })
        .then(()=>setRefresh(refresh+1))
        .catch(()=>console.log('error'))
    }

    return(
        <div>

            {mint ?
                <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <GridCard title={'Metadata'}>
                    <div className='flex flex-col h-full justify-center items-center'>
                        <span className='mb-2 font-medium text-lg'>{mint.metadata.name}</span>
                        <img className="h-32 w-32 object-cover rounded-full shadow-xl border-6 border-gray-400" src={mint.metadata.image} />
                        <span className='mt-2 text-sm text-gray-500'>1 {mint.metadata.symbol} = {mint.tokenUSDValue} USD</span>
                    </div>
                  </GridCard>
                  <GridCard title={'Addresses'}>
                    <div className='flex flex-col h-full p-6 justify-between'>
                        <AddressLink label={'Address'} address={mint.address} cluster={SOLANA_CLUSTER}/>
                        <AddressLink label={'Mint Authority'} address={mint.authority} cluster={SOLANA_CLUSTER}/>
                        <AddressLink label={'Freeze Authority'} address={mint.authority} cluster={SOLANA_CLUSTER}/>
                        <AddressLink label={'Account'} address={mint.account} cluster={SOLANA_CLUSTER}/>
                    </div>
                  </GridCard>
                  <GridCard title={'Balance'}>
                    <div className='flex flex-col h-full'>
                        <div className='flex grow justify-center items-center'>
                            <span className='text-5xl font-medium overflow-hidden text-ellipsis'>{balance ? balance.uiAmount.toString() : null}</span>
                        </div>
                        <div className='p-4'>
                            <InputButton 
                                label={'Mint Tokens'} 
                                symbol={mint.metadata.symbol}
                                onClick={(amount:number)=>mintTokens(amount)}
                            />
                        </div>
                    </div>
                  </GridCard>
                </ul>
            : null}

            <div className='flex flex-row items-center p-6 bg-gray-100 mb-4 rounded-lg mt-5'>
                <input
                    id="text"
                    name="text"
                    type="text"
                    value={portalURL}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:outline-gray-200 sm:text-sm/6"
                />
                {copied ? <span className='ml-4 text-gray-400'>Copied!</span> : <button onClick={()=>copy()} className='cursor-pointer ml-2 text-gray-400'>
                    <DocumentDuplicateIcon className='size-6'/>
                </button>}
            </div>

        </div>
    )

}

export default Mint