import {useState,ChangeEvent,FormEvent} from 'react'
import {useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import api from '../functions/api'
import { LinkIcon } from '@heroicons/react/20/solid'


function LinkWallet() {


    const {login} = useAuth()
    const [wallet,setWallet] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()


    const update = async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)
        try{
            await api.patch('/organization',{wallet})
            await login()
            navigate('/')
        }catch(e){
            console.log(e)
            alert('Oops! Something went wrong. Please try again.')
        }
        setLoading(false)
    }


  return (
        <form onSubmit={update} className="bg-white sm:max-w-md ring-1 shadow-xs ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">

            <div className='mb-4'>
                <div className='flex flex-row items-top justify-between'>
                    <h1 className='mb-2 text-md font-semibold'>Link your wallet</h1>
                    <LinkIcon className='size-6 text-gray-500'/>
                </div>
                <p className='text-sm'>Enter the address of the Solana wallet where you would like to receive payments from your customers.</p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <div className="col-span-full">
                <div className="mt-2">
                  <input
                    id="wallet"
                    type="text"
                    name="wallet"
                    value={wallet}
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>{setWallet(e.target.value)}}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    required
                  />
                </div>
              </div>

            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
            >
              {loading ? 'Loading...' : 'Continue'}
            </button>
          </div>
        </form>
    )

}


export default LinkWallet
