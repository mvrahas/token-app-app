import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../functions/api'


const Mints = ()=>{

    const navigate = useNavigate()

    const [mints,setMints] = useState<Mint[]>([])
    const get = ()=>{
        api.get(`/mint/list`)
        .then(r=>setMints(r.data))
        .catch(e=>console.log(e))
    }
    useEffect(()=>get(),[])

    return (
        <div>
            <div className='rounded-lg bg-white shadow-sm'>

                <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                  <div className="-mt-2 -ml-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                      <div className="mt-2 ml-4">
                          <h3 className="text-base font-semibold text-gray-900">Mints</h3>
                      </div>
                      <div className="mt-2 ml-4 shrink-0">
                          <button
                            onClick={()=>navigate('/tokens/mint/create')}
                            className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                          >
                            Create
                          </button>
                      </div>
                  </div>
                </div>

                {mints.length 
                  ? 
                  <ul role="list" className="divide-y divide-gray-100">
                    {mints.map((mint) => (
                      <li key={mint._id} className="flex items-center justify-between gap-x-6 px-6 py-4">
                        <div className="min-w-0">
                          <div className="flex items-start gap-x-3">
                            <p className="text-sm/6 font-semibold text-gray-900">{mint.metadata.name}</p>
                          </div>
                          <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
                            <p className="whitespace-nowrap">
                              {`Created on ${mint.createdAt.toString()}`}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-none items-center gap-x-4">
                          <button
                            onClick={()=>navigate(`/tokens/mint/${mint._id}`)}
                            className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:block cursor-pointer"
                          >
                            Manage
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul> 
                  : 
                  <div className="text-center py-16">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto size-12 text-gray-400">
                        <path 
                            strokeWidth="1" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" 
                        />
                    </svg>
                      <h3 className="mt-2 text-sm font-semibold text-gray-900">No mints</h3>
                      <p className="mt-1 text-sm text-gray-500">Create a mint to issue tokens</p>
                  </div>
                }

            </div>
        </div>
    )

}

export default Mints