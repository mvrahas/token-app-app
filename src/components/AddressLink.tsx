import React from "react"
import { LinkIcon } from '@heroicons/react/20/solid'


interface AddressLinkProps {
    label : string,
    address : string,
    cluster : string,
}


const AddressLink : React.FC<AddressLinkProps> = ({label,address,cluster})=>{

    const getParams = (cluster:string)=>{
        if(cluster==='devnet'){
            return '?cluster=devnet'
        }else{
            return ''
        }
    }

    return(
        <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">{label}</span>
            <div className="flex flex-row">
                <a className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 overflow-hidden text-ellipsis" target="_blank" href={`https://explorer.solana.com/address/${address}${getParams(cluster)}`}>{address}</a>
                <LinkIcon className="size-4 ml-1"/>
            </div>
        </div>
    )
}

export default AddressLink