import {useState,ChangeEvent,FormEvent} from 'react'
import {useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import api from '../functions/api'


function CompleteSetup() {


  const {login} = useAuth()
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [organizationName,setOrganizationName] = useState('')
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()


  const update = async (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setLoading(true)
    try{
        await api.patch('/user',{firstName,lastName})
        await api.patch('/organization',{name:organizationName})
        await login()
        navigate('/')
    }catch(e){
        console.log(e)
        alert('Oops! Something went wrong. Please try again.')
    }
    setLoading(false)
  }


  return (
    <div className='flex justify-center items-center h-screen bg-gray-50'>
        <form onSubmit={update} className="bg-white ring-1 shadow-xs ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <div className="sm:col-span-3">
                <label htmlFor="firstName" className="block text-sm/6 font-medium text-gray-900">
                  First name
                </label>
                <div className="mt-2">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>{setFirstName(e.target.value)}}
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="lastName" className="block text-sm/6 font-medium text-gray-900">
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>{setLastName(e.target.value)}}
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    required
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="organizationName" className="block text-sm/6 font-medium text-gray-900">
                  Organization
                </label>
                <div className="mt-2">
                  <input
                    id="organizationName"
                    type="text"
                    name="organizationName"
                    value={organizationName}
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>{setOrganizationName(e.target.value)}}
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
    </div>
  )

}


export default CompleteSetup
