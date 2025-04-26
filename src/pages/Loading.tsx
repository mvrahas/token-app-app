import React from "react"
import useAuth from "../hooks/useAuth"
import useMint from "../hooks/useMint"
import Spinner from "../components/Spinner"

const Loading : React.FC<Props> = ({children})=>{

    const mint = useMint()
    const auth = useAuth()

    if(mint.isLoaded && auth.isLoaded){
        return children
    }else{
        return <Spinner/>
    }
}

export default Loading