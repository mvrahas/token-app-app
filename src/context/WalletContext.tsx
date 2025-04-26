import React, {useState, createContext} from 'react'

const WalletContext = createContext<WalletContextType|null>(null)

interface WalletContextType {
    publicKey : string|null,
    connect : ()=>void,
}

export const WalletProvider : React.FC<Props> = ({children})=>{

    const [publicKey,setPublicKey] = useState(null)

    const connect = async ()=>{
        if(window.phantom){
            try {
              const response = await window.phantom.solana.connect()
              setPublicKey(response.publicKey.toString())
            } catch (e) {
              alert('Oops! Something went wrong. Please try again.')
            }
        }else{
          alert('Please install Phantom wallet.')
        }
    }

    return(
        <WalletContext.Provider value={{
            publicKey,
            connect,
        }}>
            {children}
        </WalletContext.Provider>
    )
}

export default WalletContext