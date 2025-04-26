import {useState,FormEvent} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import api from '../functions/api'




function AuthReset() {

  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try{
      await api.patch('/auth/reset/send',{email})
      navigate('/auth/reset/message')
    }catch(e){
      setError('Oops! Something went wrong.')
    }
    setLoading(false)
  }

  return (
    <>
      <div className='h-screen bg-gray-50'>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            alt="Your Company"
            src="/numin.svg"
            className="mx-auto h-12 w-auto"
          />
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Reset your password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
            <form onSubmit={submit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>


              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                >
                  {loading ? 'Loading...' : 'Send Email'}
                </button>
              </div>
            </form>
            {error ? <p className='text-sm mt-2 text-red-400'>{error}</p>: null}
          </div>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Don't need to reset?{' '}
            <Link to={'/auth/login'} className="font-semibold text-indigo-600 hover:text-indigo-500">
              Back to login
            </Link>
          </p>

        </div>
      </div>
      </div>
    </>
  )

}


export default AuthReset
