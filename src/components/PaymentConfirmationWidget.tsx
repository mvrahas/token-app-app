import React from "react"



interface PaymentConfirmationWidgetProps {
    info : PaymentPortalInfo,
}



const PaymentConfirmationWidget : React.FC<PaymentConfirmationWidgetProps> = ({info})=>{
    return(
        <div className="flex flex-col items-center w-full sm:max-w-82 mt-3 sm:mt-12">
            <div className="flex flex-col items-center w-full mb-3 p-5 bg-white ring-1 shadow-xs ring-gray-900/5 rounded-xl">



                    <div>
                        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                            <svg className="size-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                        </div>
                        <div className="mt-3 text-center sm:mt-5">
                            <h3 className="text-base font-semibold text-gray-900" id="modal-title">Payment successful</h3>
                            <div className="mt-2 mb-3">
                                <p className="text-sm text-gray-500">Follow the link below to go back to the original website.</p>
                            </div>
                        </div>
                    </div>


                    <div className="w-full mt-2">
                        <button 
                            onClick={()=>window.location.href=info.returnURL}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                        >
                            Back to website
                        </button>
                    </div>




        
            </div>
        </div>
    )
}

export default PaymentConfirmationWidget