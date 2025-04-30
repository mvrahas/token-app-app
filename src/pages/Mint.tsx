import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import api from '../functions/api'
import getBalance from '../functions/getBalance'
import GridCard from '../components/GridCard'
import AddressLink from '../components/AddressLink'
import InputButton from '../components/InputButton'

const SOLANA_CLUSTER = import.meta.env.VITE_SOLANA_CLUSTER

const Mint = ()=>{

    const {_id} = useParams()
    const navigate = useNavigate()
    const [mint,setMint] = useState<Mint|null>(null)
    const [balance,setBalance] = useState<Balance|null>(null)
    const [refresh,setRefresh] = useState(0)

    const getMint = ()=>{
        api.get(`/mint?_id=${_id}`)
        .then(r=>setMint(r.data))
        .catch(e=>console.log(e))
    }
    useEffect(getMint,[_id])

    const updateBalance = ()=>{
        if(!mint){return}
        getBalance('devnet',mint.account)
        .then(r=>setBalance(r))
        .catch(e=>console.log(e))
    }
    useEffect(updateBalance,[mint,_id,refresh])

    const mintTokens = (amount:number)=>{
        return api.post('/mint/mint',{
            mintId:_id,
            amount
        })
        .then(r=>setRefresh(refresh+1))
        .catch(e=>console.log(e))
    }

    console.log(SOLANA_CLUSTER)

    return (
        <>
        {mint ?
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <GridCard title={'Metadata'}>
            <div className='flex flex-col h-full justify-center items-center'>
                <img className="h-36 w-36 object-cover rounded-full shadow-xl border-8 border-gray-400" src={mint.metadata.image} />
                <span className='mt-2 text-base'>{mint.metadata.name}</span>
            </div>
          </GridCard>
          <GridCard title={'Cluster'}>
            <div className='flex flex-col justify-center items-center p-6 h-full'>
            {
                SOLANA_CLUSTER === 'mainnet' ? 
                <span className="inline-flex items-center rounded-md bg-green-50 px-4 py-2 text-lg font-medium text-green-700 ring-4 ring-green-600/20 ring-inset">
                    Mainnet
                </span> 
                : SOLANA_CLUSTER === 'devnet' ?
                <span className="inline-flex items-center rounded-md bg-yellow-50 px-4 py-2 text-lg font-medium text-yellow-700 ring-4 ring-yellow-600/20 ring-inset">
                    Devnet
                </span> 
                : null
            }
            </div>
          </GridCard>
          <GridCard title={'Addresses'}>
            <div className='flex flex-col h-full p-6 justify-between'>
                <AddressLink label={'Address'} address={mint.address} cluster={SOLANA_CLUSTER}/>
                <AddressLink label={'Authority'} address={mint.authority} cluster={SOLANA_CLUSTER}/>
                <AddressLink label={'Account'} address={mint.account} cluster={SOLANA_CLUSTER}/>
            </div>
          </GridCard>
          <GridCard title={'Account Balance'}>
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
          <GridCard title={'Landing Page'}>
            <p>
                Use this link to purchase
            </p>
          </GridCard>
        </ul>
        : null}
        </>
      )

}

export default Mint