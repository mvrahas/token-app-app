import React from "react"
import useAuth from "../hooks/useAuth"
import Spinner from "../components/Spinner"

const Loading : React.FC<Props> = ({children})=>{

    const auth = useAuth()

    if(auth.isLoaded){
        return children
    }else{
        return <Spinner/>
    }
}

export default Loading