import api from './api'

const getBalance = async (cluster : string, account : string)=>{
    const balance = (await api.post('/rpc/balance',{cluster,account})).data
    return balance
}

export default getBalance