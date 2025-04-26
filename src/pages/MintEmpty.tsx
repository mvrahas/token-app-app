import { Navigate } from "react-router-dom"
import useMint from "../hooks/useMint"
import EmptyStateMain from "../components/EmptyStateMain"


const MintEmpty = ()=>{
    
    const {mints} = useMint()

    if(mints.length){
        return <Navigate to={`/overview/${mints[0]._id}`}/>
    }

    return(
        <div className="h-full flex justify-center items-center">
            <EmptyStateMain/>
        </div>
    )
}


export default MintEmpty