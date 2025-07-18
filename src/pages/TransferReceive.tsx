import React, {useState,ChangeEvent,FormEvent} from 'react'
import api from '../functions/api'
import CopyButton from '../components/CopyButton'


const TransferReceive = ()=>{


    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')
    const [link,setLink] = useState(null)


    const [amount,setAmount] = useState(0)
    const [memo,setMemo] = useState('')


    const receive = async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setError('')
        setLoading(true)
        try{

          //api call to create mint
          const {data} = await api.post('/transaction/receive',{amountUSD:amount,memo})
            
          //ok->
          setLink(data.portalURL)

        }catch(e:any){
            if(e.response.data.error){setError(e.response.data.error)}
            else{setError('Oops! Something went wrong!')}
        }
        setLoading(false)
    }


    const handleInput = (e : React.ChangeEvent<HTMLInputElement>)=>{
        const val = e.target.value
        setAmount(Number(val))
    }


    return (
        <form onSubmit={receive}>
          <div className="space-y-12">



            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
              <div>
                <h2 className="text-base/7 font-semibold text-gray-900">Receive</h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                    Create a unique link that your customers can use to complete a payment.
                </p>
              </div>
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">


                <div className="sm:col-span-4">
                    <label htmlFor="amount" className="block text-sm/6 font-medium text-gray-900">
                        Amount:
                    </label>
                    <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                placeholder="100"
                                value={amount === 0 ? '' : amount}
                                onChange={handleInput}
                                className="uppercase block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                required
                            />
                        </div>
                    </div>
                </div>


                <div className="sm:col-span-4">
                    <label htmlFor="memo" className="block text-sm/6 font-medium text-gray-900">
                        Memo:
                    </label>
                    <div className="mt-2">
                        <textarea
                            id="memo"
                            name="memo"
                            rows={3}
                            placeholder="Digital media licensing fees for Brain Farm Creative"
                            value={memo}
                            onChange={(e:ChangeEvent<HTMLTextAreaElement>)=>{setMemo(e.target.value)}}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            required
                        />
                    </div>
                </div>



              </div>
            </div>


            
          </div>
    


            {link ? 
                <div className='mt-6'>
                    <CopyButton value={link}/>
                </div>
            : 
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                    >
                      {loading ? 'Loading...' : 'Receive'}
                    </button>
                </div>
            }

          
          {error ? <p className="mt-6 flex items-center justify-end gap-x-6 text-red-400">{error}</p> : null}



        </form>
        

      )


}


export default TransferReceive