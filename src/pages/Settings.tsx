import { useState, useEffect } from 'react'
import api from '../functions/api'
import { DocumentDuplicateIcon } from '@heroicons/react/20/solid'


const Settings = ()=>{

    const [keys,setKeys] = useState<Key[]>([])
    const get = ()=>{
        api.get(`key/list`)
        .then(r=>setKeys(r.data))
        .catch(e=>console.log(e))
    }
    useEffect(()=>get(),[])

    const [key,setKey] = useState()
    const [copied,setCopied] = useState(false)
    const create = ()=>{
        api.post(`/key`,{})
        .then(r=>setKey(r.data.auth))
        .catch(e=>console.log(e))
    }

    const copy = ()=>{
        if(key){
            navigator.clipboard.writeText(key)
            setCopied(true)
        }
    }    

    const expire = (keyId:string)=>{
        api.patch(`/key/expire`,{keyId})
        .then(r=>setKeys(keys.filter(key=>key._id != r.data._id)))
        .catch(e=>console.log(e))
    }

    return (

        <div>


            {key ? 
              <div className='flex flex-row items-center p-6 bg-gray-100 mb-4 rounded-lg'>
                <input
                    defaultValue="you@example.com"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={key}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:outline-gray-200 sm:text-sm/6"
                />
                {copied ? <span className='ml-4 text-gray-400'>Copied!</span> : <button onClick={()=>copy()} className='cursor-pointer ml-2 text-gray-400'>
                    <DocumentDuplicateIcon className='size-6'/>
                </button>}
              </div> 
            : null}


            <div className='rounded-lg bg-white shadow-sm'>

              <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                <div className="-mt-2 -ml-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="mt-2 ml-4">
                        <h3 className="text-base font-semibold text-gray-900">Keys</h3>
                    </div>
                    <div className="mt-2 ml-4 shrink-0">
                        <button
                          onClick={()=>create()}
                          className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                        >
                          Create
                        </button>
                    </div>
                </div>
              </div>
              
              {keys.length 
                ? 
                <ul role="list" className="divide-y divide-gray-100">
                  {keys.map((key) => (
                    <li key={key._id} className="flex items-center justify-between gap-x-6 px-6 py-4">
                      <div className="min-w-0">
                        <div className="flex items-start gap-x-3">
                          <p className="text-sm/6 font-semibold text-gray-900">{key.name}</p>
                        </div>
                        <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
                          <p className="whitespace-nowrap">
                            {`Created on ${key.createdAt.toString()}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-none items-center gap-x-4">
                        <button
                          onClick={()=>expire(key._id)}
                          className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:block cursor-pointer"
                        >
                          Expire
                        </button>
                      </div>
                    </li>
                  ))}
                </ul> 
                : 
                <div className="text-center py-16">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="mx-auto size-12 text-gray-400"
                  >
                    <path
                      d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                      strokeWidth={2}
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No keys</h3>
                    <p className="mt-1 text-sm text-gray-500">Create a key to access the API</p>
                </div>
              }

            </div>


        </div>
      )

}

export default Settings