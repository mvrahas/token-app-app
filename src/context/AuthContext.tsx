import React, {createContext,useEffect,useState} from 'react'
import api from '../functions/api'


const AuthContext = createContext<AuthContextType|null>(null)


export const AuthProvider : React.FC<Props> = ({children})=>{

    const [user,setUser] = useState(null)
    const [organization,setOrganization] = useState(null)
    const [isLoaded,setIsLoaded] = useState(false)
    const isAuthenticated = user ? true : false

    const login = async ()=>{
        try {
            const r = await api.get('/user')
            const o = await api.get('/organization')
            setUser(r.data)
            setOrganization(o.data)
        } catch (e) {
            throw e
        }
    }

    const load = async ()=>{
        try{
            await login()
        }catch(e){
            console.log(e)
        }
        setIsLoaded(true)
    }

    useEffect(()=>{
        load()
    },[])

    return(
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            organization,
            login,
            isLoaded,
        }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext