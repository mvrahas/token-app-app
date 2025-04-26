import { useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import api from "../functions/api"
import useAuth from "../hooks/useAuth"


const BillingSuccess = ()=>{


    const {login} = useAuth()
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get("session_id")

    const success = async ()=>{
        try{
            await api.post('/billing/success',{sessionId})
            await login()
        }catch(e){
            console.log('Something went wrong!')
        }
    }
    useEffect(()=>{success()},[])


    return (
        <div>
          <div className="fixed inset-0 bg-gray-50 transition-opacity" aria-hidden="true"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                    <svg className="size-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-base font-semibold text-gray-900" id="modal-title">Payment successful</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Thank you for signing up for a subscription. You should now have full access.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                    <Link 
                        to={'/'} 
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Go back to dashboard
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}


export default BillingSuccess