import React from "react"
import useAuth from "../hooks/useAuth"
import {Navigate} from "react-router-dom"

interface Props {
    children: React.ReactNode
}

const Locked : React.FC<Props> = ({children}) => {

  const {user,organization,isAuthenticated} = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/auth/login"/>
  }

  if (!user?.firstName){
    return <Navigate to="/setup"/>
  }

  if (!organization?.wallet){
    return <Navigate to="/setup/wallet"/>
  }

  return <>
    {children}
  </>
  
}

export default Locked