import React, {useState} from 'react'
import api from '../functions/api'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'


const BillingSubscriptions = ()=>{


    const {organization} = useAuth()
    const customer = organization ? organization.billing.customerId : null
    const [product, setProduct] = useState('startup')
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')


    const subscribe = async ()=>{
        console.log('hey')
        if(product==='enterprise'){
            setError('Please contact us for enterprise plans!')
            return
        }
        setLoading(true)
        try{
            const response = await api.post('/billing/checkout',{product,customer})
            console.log(response)
            const url = response.data.url
            window.open(url)
        }catch(e){
            setError('Something went wrong!')
        }
        setLoading(false)
    }


    const handleProductChange = async (event:React.ChangeEvent<HTMLInputElement>) => {
        setProduct(event.target.value)
    }


    return(
        <div>
        <div className="space-y-12">
              

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div>
              <h2 className="text-base/7 font-semibold text-gray-900">Choose a plan</h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                Choose a plan that best suits the needs of your business.
              </p>
            </div>
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">

        
                <div className="sm:col-span-4">
                    <fieldset className="-space-y-px rounded-md bg-white">
                        <label
                          className="group flex cursor-pointer border border-gray-200 p-4 first:rounded-tl-md first:rounded-tr-md last:rounded-br-md last:rounded-bl-md focus:outline-hidden has-checked:relative has-checked:border-indigo-200 has-checked:bg-indigo-50"
                        >
                            <input
                              type="radio" 
                              id="startup" 
                              name="startup" 
                              value="startup"
                              onChange={handleProductChange}
                              checked={product === 'startup'}
                              className="relative mt-0.5 size-4 shrink-0 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                            />
                            <span className="ml-3 flex flex-col">
                              <span className="block text-sm font-medium text-gray-900 group-has-checked:text-indigo-900">
                                Startup
                              </span>
                              <span className="block text-sm text-gray-500 group-has-checked:text-indigo-700">Access to the software tools for new startups.</span>
                            </span>
                        </label>
                        <label
                          className="group flex cursor-pointer border border-gray-200 p-4 first:rounded-tl-md first:rounded-tr-md last:rounded-br-md last:rounded-bl-md focus:outline-hidden has-checked:relative has-checked:border-indigo-200 has-checked:bg-indigo-50"
                        >
                            <input
                              type="radio" 
                              id="business" 
                              name="business" 
                              value="business"
                              onChange={handleProductChange}
                              checked={product === 'business'}
                              className="relative mt-0.5 size-4 shrink-0 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                            />
                            <span className="ml-3 flex flex-col">
                              <span className="block text-sm font-medium text-gray-900 group-has-checked:text-indigo-900">
                                Business
                              </span>
                              <span className="block text-sm text-gray-500 group-has-checked:text-indigo-700">Access to the software tools for growing businesses.</span>
                            </span>
                        </label>
                    </fieldset>
                </div>


            </div>
          </div>
  

        </div>
  

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link to={'/'} className="text-sm/6 font-semibold text-gray-900">
            Cancel
          </Link>
          <button
            onClick={subscribe}
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
          >
            {loading ? 'Loading...' : 'Continue'}
          </button>
        </div>
        {error ? <p className="mt-6 flex items-center justify-end gap-x-6 text-red-400">{error}</p> : null}


        </div>        
    )



    /*

        <div className="sm:col-span-4">
        <fieldset className="-space-y-px rounded-md bg-white">
                    <label
                      className="group flex cursor-pointer border border-gray-200 p-4 first:rounded-tl-md first:rounded-tr-md last:rounded-br-md last:rounded-bl-md focus:outline-hidden has-checked:relative has-checked:border-indigo-200 has-checked:bg-indigo-50"
                    >
                      <input
                        type="radio" 
                        id="startup" 
                        name="startup" 
                        value="startup"
                        onChange={handleProductChange}
                        checked={product === 'startup'}
                        className="relative mt-0.5 size-4 shrink-0 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                      />
                      <span className="ml-3 flex flex-col">
                        <span className="block text-sm font-medium text-gray-900 group-has-checked:text-indigo-900">
                          Startup
                        </span>
                        <span className="block text-sm text-gray-500 group-has-checked:text-indigo-700">Access to the software tools for up and coming startups.</span>
                      </span>
                    </label>
                    <label
                      className="group flex cursor-pointer border border-gray-200 p-4 first:rounded-tl-md first:rounded-tr-md last:rounded-br-md last:rounded-bl-md focus:outline-hidden has-checked:relative has-checked:border-indigo-200 has-checked:bg-indigo-50"
                    >
                      <input
                        type="radio" 
                        id="business" 
                        name="business" 
                        value="business"
                        onChange={handleProductChange}
                        checked={product === 'business'}
                        className="relative mt-0.5 size-4 shrink-0 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                      />
                      <span className="ml-3 flex flex-col">
                        <span className="block text-sm font-medium text-gray-900 group-has-checked:text-indigo-900">
                          Business
                        </span>
                        <span className="block text-sm text-gray-500 group-has-checked:text-indigo-700">Access to the software tools for growing businesses.</span>
                      </span>
                    </label>
        </fieldset>
        </div>

    */


    /*
    return (
        <div>
            <h1>Select a subscription!</h1>
            <RadioButtonGroup
                options={[
                    { label: 'Startup', value: 'startup'},
                    { label: 'Business', value: 'business' },
                    { label: 'Enterprise', value: 'enterprise' },
                ]}
                value={product}
                onChange={handleChange}
            />
            <button onClick={subscribe}>Subscribe</button>
            {error ? <p>{error}</p> : null}
            {loading ? 'Loading...': null}
        </div>
    )
    */
}


export default BillingSubscriptions