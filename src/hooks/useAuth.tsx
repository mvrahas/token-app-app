import { useContext } from "react"
import AuthContext from "../context/AuthContext"

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("Must be used within a provider")
  }
  return context
}

export default useAuth