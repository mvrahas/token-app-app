import React, {useState} from 'react'
import { DocumentDuplicateIcon } from '@heroicons/react/20/solid'


interface CopyButtonProps {
    value : string
}


const CopyButton : React.FC<CopyButtonProps> = ({value})=>{

    const [copied, setCopied] = useState(false)
    
    const copy = ()=>{
        navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(()=>{setCopied(false)},2000)
    }

    return(
        <div className='flex flex-row items-center p-6 bg-gray-100 mb-4 rounded-lg'>
            <input
                id="text"
                name="text"
                type="text"
                value={value}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:outline-gray-200 sm:text-sm/6"
            />
            {copied ? 
                <span className='ml-4 text-gray-400'>Copied!</span> 
                : 
                <button onClick={copy} className='cursor-pointer ml-2 text-gray-400'>
                    <DocumentDuplicateIcon className='size-6'/>
                </button>
            }
        </div>
    )
}


export default CopyButton