import React, { useState,useEffect,createContext } from 'react'
import api from '../functions/api'

const MintContext = createContext<MintContextType|null>(null)

interface MintContextType {
    mint: string|null
    mints : Mint[],
    setMint : Function,
    getMints : Function,
    isLoaded : boolean
}

export const MintProvider : React.FC<Props> = ({children})=>{

    const [mint,setMint] = useState(null)
    const [mints,setMints] = useState<Mint[]>([])
    const [isLoaded,setIsLoaded] = useState(false)

    const getMints = async ()=>{
        try {
            const {data} = await api.get('/mint/list')
            setMints(data)
        }catch(e){
            throw e
        }
      return api.get('/mint/list')
    }
    
    const load = async ()=>{
        try{
            await getMints()
        }catch(e){
            console.log(e)
        }
        setIsLoaded(true)
    }
    
    useEffect(()=>{
        load()
    },[])

    return(
        <MintContext.Provider value={{
            mint,
            mints,
            setMint,
            getMints,
            isLoaded,
        }}>
            {children}
        </MintContext.Provider>
    )
}

export default MintContext