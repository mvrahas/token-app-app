import React,{useState} from "react"


interface PaymentRedemptionWidgetProps {
    info : PaymentPortalInfo
    setActiveView: Function,
    tokenAmount : number,
    setTokenAmount : Function,
    tokenUSDValue : number,
}


const PaymentRedemptionWidget : React.FC<PaymentRedemptionWidgetProps> = ({info,setActiveView,tokenAmount,setTokenAmount,tokenUSDValue})=>{
    
    const [amount,setAmount] = useState(0)

    return(
        <div className="flex flex-col items-center w-full sm:max-w-82 mt-3 sm:mt-12">
                        
        
                        <div className="flex flex-col items-center w-full mb-3 p-5 bg-white ring-1 shadow-xs ring-gray-900/5 rounded-xl">

                            <div className="flex flex-col items-center mb-5">
                                <p className="text-md mb-2">Coffee Beans</p>
                                <img className="h-18 w-18 rounded-full border-5 border-gray-400 mb-2" src={'/token-icon-cbx.png'}/>
                                <p className="text-xs text-gray-400">{amount} CBX = {(amount*tokenUSDValue).toFixed(2)} USD</p>
                            </div>

                            <div className="w-full">
                              <input
                                id="amount"
                                name="amount"
                                type="number"
                                placeholder="0"
                                value={amount === 0 ? '' : amount}
                                onChange={(e)=>setAmount(Number(e.target.value))}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                              />
                            </div>
                            



                            
                            <div className="w-full mt-2">
                                <button 
                                    onClick={()=>setActiveView('payment')}
                                    className="flex w-full justify-center rounded-md bg-gray-200 px-3 py-1.5 text-sm/6 font-semibold text-black shadow-xs hover:bg-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>



                            <div className="w-full mt-2">
                                <button 
                                    onClick={()=>{setTokenAmount(amount);setActiveView('payment')}}
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                                >
                                    Apply
                                </button>
                            </div>




        
                        </div>
        
        
        
                    </div>
    )   
}

export default PaymentRedemptionWidget