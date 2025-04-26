import { useContext } from 'react'
import MintContext from '../context/MintContext'

const useMint = ()=>{
    const context = useContext(MintContext)
    if(!context){
        throw new Error("Must be used within a provider")
    }
    return context
}

export default useMint