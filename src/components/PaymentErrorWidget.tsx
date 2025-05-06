import React from "react"



interface PaymentErrorWidgetProps {
    info : PaymentPortalInfo,
}



const PaymentErrorWidget : React.FC<PaymentErrorWidgetProps> = ({info})=>{
    return(
        <div className="flex flex-col items-center w-full sm:max-w-82 mt-3 sm:mt-12">
            <div className="flex flex-col items-center w-full mb-3 p-5 bg-white ring-1 shadow-xs ring-gray-900/5 rounded-xl">



                    <div>
                        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-100">
                        <svg className="size-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" data-slot="icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                        </svg>
                        </div>
                        <div className="mt-3 text-center sm:mt-5">
                            <h3 className="text-base font-semibold text-gray-900" id="modal-title">Payment failed</h3>
                            <div className="mt-2 mb-3">
                                <p className="text-sm text-gray-500">It appears something went wrong with your payment. Please try again or get help below.</p>
                            </div>
                        </div>
                    </div>


                    <div className="w-full mt-2">
                        <button 
                            onClick={()=>window.location.href='mailto:support@numin.xyz'}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                        >
                            Get help
                        </button>
                    </div>




        
            </div>
        </div>
    )
}

export default PaymentErrorWidget