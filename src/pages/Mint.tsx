import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import api from '../functions/api'
import mintToken from '../functions/mintToken'
import approveDelegate from '../functions/approveDelegate'
import getBalance from '../functions/getBalance'
import GridCard from '../components/GridCard'
import AddressLink from '../components/AddressLink'
import InputButton from '../components/InputButton'

const Mint = ()=>{

    const {mintId} = useParams()
    const navigate = useNavigate()
    const [mint,setMint] = useState<Mint|null>(null)
    const [balance,setBalance] = useState<Balance|null>(null)

    const getMint = ()=>{
        api.get(`/mint?_id=${mintId}`)
        .then(r=>setMint(r.data))
        .catch(e=>console.log(e))
    }
    useEffect(getMint,[mintId])

    const updateBalance = ()=>{
        if(!mint){return}
        getBalance(mint.cluster,mint.account)
        .then(r=>setBalance(r))
        .catch(e=>console.log(e))
    }
    useEffect(updateBalance,[mint,mintId])

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
                mint.cluster === 'mainnet' ? 
                <span className="inline-flex items-center rounded-md bg-green-50 px-4 py-2 text-lg font-medium text-green-700 ring-4 ring-green-600/20 ring-inset">
                    Mainnet
                </span> 
                : mint.cluster === 'devnet' ?
                <span className="inline-flex items-center rounded-md bg-yellow-50 px-4 py-2 text-lg font-medium text-yellow-700 ring-4 ring-yellow-600/20 ring-inset">
                    Devnet
                </span> 
                : null
            }
            </div>
          </GridCard>
          <GridCard title={'Addresses'}>
            <div className='flex flex-col h-full p-6 justify-between'>
                <AddressLink label={'Address'} address={mint.address} cluster={mint.cluster}/>
                <AddressLink label={'Authority'} address={mint.authority} cluster={mint.cluster}/>
                <AddressLink label={'Account'} address={mint.account} cluster={mint.cluster}/>
                <AddressLink label={'Delegate'} address={mint.delegate} cluster={mint.cluster}/>
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
                        onClick={(amount:number)=>mintToken(mint.cluster,mint.authority,mint.address,mint.account,amount)}
                    />
                </div>
            </div>
          </GridCard>
          <GridCard title={'Delegated Balance'}>
            <div className='flex flex-col h-full'>
                <div className='flex grow justify-center items-center'>
                    <span className='text-5xl font-medium overflow-hidden text-ellipsis'>{balance ? balance.uiDelegatedAmount.toString() : null}</span>
                </div>
                <div className='p-4'>
                    <InputButton 
                        label={'Delegate Tokens'} 
                        symbol={mint.metadata.symbol}
                        onClick={(amount:number)=>approveDelegate(mint.cluster,mint.authority,mint.account,mint.address,mint.delegate,amount)}
                    />
                </div>
            </div>
          </GridCard>
          <GridCard title={'Token Sales'}>
            <div className='flex flex-col h-full'>
                <div className='flex grow justify-center items-center'>
                    <span className='text-5xl font-medium overflow-hidden text-ellipsis'>{mint.bank.balance/Math.pow(10,6)}</span>
                </div>
                <div className='p-4'>
                    <InputButton 
                        label={'Cash Out'} 
                        symbol={'USD'}
                        onClick={()=>navigate('/billing/payments')}
                    />
                </div>
            </div>
          </GridCard>
        </ul>
        : null}
        </>
      )

}

export default Mint