import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'


const Settings = () => {

    const {organization} = useAuth()
    const navigate = useNavigate()
    
    return (
      <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800/50 dark:shadow-none dark:inset-ring dark:inset-ring-white/10">
        <div className="px-4 py-6 sm:px-6">
          <h3 className="text-base/7 font-semibold text-gray-900 dark:text-white">Settings</h3>
          <p className="mt-1 max-w-2xl text-sm/6 text-gray-500 dark:text-gray-300">Update the settings for your organization</p>
        </div>
        <div className="border-t border-gray-100 dark:border-white/5">
          <dl className="divide-y divide-gray-100 dark:divide-white/5">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900 dark:text-gray-100 flex flex-row items-center"><div>Organization</div></dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-1 sm:mt-0 dark:text-gray-300 flex flex-row items-center"><div>{organization ? organization.name : null}</div></dd>
              <div className='sm:col-span-1 flex flex-row justify-end'>
                <div
                    onClick={()=>navigate('/settings/wallet')}
                    className="invisible hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:block cursor-pointer"
                >
                    Edit
                </div>
              </div>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900 dark:text-gray-100 flex flex-row items-center"><div>Wallet</div></dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-1 sm:mt-0 dark:text-gray-300 flex flex-row items-center"><div className='truncate'>{organization ? organization.wallet : null}</div></dd>
              <div className='sm:col-span-1 flex flex-row justify-end'>
                <button
                    onClick={()=>navigate('/settings/wallet')}
                    className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:block cursor-pointer"
                >
                    Edit
                </button>
              </div>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900 dark:text-gray-100 flex flex-row items-center"><div>API Keys</div></dt>
              <dd className="mt-1 italic text-sm/6 text-gray-500 sm:col-span-1 sm:mt-0 dark:text-gray-300 flex flex-row items-center"><div>Create & manage API keys</div></dd>
              <div className='sm:col-span-1 flex flex-row justify-end'>
                <button
                    onClick={()=>navigate('/settings/keys')}
                    className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:block cursor-pointer"
                >
                    Manage
                </button>
              </div>
            </div>
          </dl>
        </div>
      </div>
    )
}


export default Settings
