import {Link} from 'react-router-dom'


function AuthVerify() {
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-50'>
            <div className="relative bg-white max-w-160 shadow-sm sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-base font-semibold text-gray-900">Check your email</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                      Please check your email for a one-time link that you can use to reset your password to a new one of your choosing.
                    </p>
                </div>
                <div className="mt-3 text-sm/6">
                  <Link to={'/auth/reset'} className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Send email again
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="h-20 w-20"></div>
        </div>
    )

}


export default AuthVerify
