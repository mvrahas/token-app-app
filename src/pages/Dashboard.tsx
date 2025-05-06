import { useState,useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import api from "../functions/api"
import GridCard from '../components/GridCard'
import InputButton from '../components/InputButton'

const Dashboard = ()=>{

    //navigate
    const navigate = useNavigate()

    //get account balance
    const [balance,setBalance] = useState(null)
    const getBalance = ()=>{
        api.get(`/organization/balance`)
        .then(r=>setBalance(r.data.uiAmount))
        .catch(e=>console.log(e))
    }
    useEffect(getBalance,[])


    return(
        <>
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <GridCard title={'Balance'}>
            <div className='flex flex-col h-full'>
                <div className='flex grow justify-center items-center'>
                    <span className='text-5xl font-medium overflow-hidden text-ellipsis'>{balance}</span>
                </div>
                <div className='p-4'>
                    <InputButton 
                        label={'Withdraw'} 
                        symbol={'USD'}
                        onClick={()=>navigate('/billing/payments')}
                    />
                </div>
            </div>
          </GridCard>
        </ul>
        </>
    )
}


export default Dashboard