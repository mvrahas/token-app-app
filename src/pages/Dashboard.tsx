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
            {balance ?
            <div className='flex flex-col items-center justify-center h-full'>
                <div className='flex justify-center items-center'>
                    <span className='text-5xl font-medium overflow-hidden text-ellipsis'>{balance}</span>
                </div>
                <div className="flex flex-row items-center mt-3">
                    <img className="h-5 w-5 rounded-full" src={`/icons/USDC.png`}/>
                    <span className='text-sm ml-1 text-gray-400 font-medium overflow-hidden text-ellipsis'>USDC</span>
                </div>
            </div>
            : null}
          </GridCard>
        </ul>
        </>
    )
}


export default Dashboard