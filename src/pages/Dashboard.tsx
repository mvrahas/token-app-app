import { useState,useEffect } from "react"
import api from "../functions/api"


const Dashboard = ()=>{


    //get account balance
    const [balance,setBalance] = useState(null)
    const getBalance = ()=>{
        api.get(`/organization/balance`)
        .then(r=>setBalance(r.data.uiAmount))
        .catch(e=>console.log(e))
    }
    useEffect(getBalance,[])


    return(
        <div>
            <p>USDC Balance</p>
            <span>{balance}</span>
        </div>
    )
}


export default Dashboard