import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { DocumentDuplicateIcon } from '@heroicons/react/20/solid'


const Sales = ()=>{

    const {mintId} = useParams()

    const portalURL = `${window.location.origin}/portal/gift/${mintId}`
    const [copied,setCopied] = useState(false)

    const copy = ()=>{
        if(portalURL){
            navigator.clipboard.writeText(portalURL)
            setCopied(true)
        }
    }    

    return (
        <div>
            <div className='rounded-lg bg-white shadow-sm'>

                <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                    <div className="-mt-2 -ml-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                        <div className="mt-2 ml-4">
                            <h3 className="text-base font-semibold text-gray-900">Sales</h3>
                        </div>
                        <div className="mt-2 ml-4 shrink-0">
                            <button
                              onClick={()=>copy()}
                              className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                            >
                              Copy Link
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center py-16">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto size-12 text-gray-400">
                        <path 
                            strokeWidth="1" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" 
                        />
                    </svg>
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">Gift portal</h3>
                    <p className="max-w-72 mb-6 w-full text-center mt-1 text-sm text-gray-500">Sell your tokens like gift cards</p>
                    <div className='max-w-100 w-full flex flex-row items-center p-6 bg-gray-100 mb-4 rounded-lg'>
                        <input
                            defaultValue="you@example.com"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={portalURL}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:outline-gray-200 sm:text-sm/6"
                        />
                        {copied ? <span className='ml-4 text-gray-400'>Copied!</span> : <button onClick={()=>copy()} className='cursor-pointer ml-2 text-gray-400'>
                            <DocumentDuplicateIcon className='size-6'/>
                        </button>}
                    </div>
                </div>
                
            </div>
        </div>
      )

}

export default Sales