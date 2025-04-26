import { useNavigate } from 'react-router-dom'
import { PlusIcon } from '@heroicons/react/20/solid'


const EmptyStateMain = () => {
    
    const navigate = useNavigate()

    return (
        <div className="text-center">
            <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 48 48"
                aria-hidden="true"
                className="mx-auto size-12 text-gray-400"
            >
                <path
                    d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No mints</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new mint.</p>
            <div className="mt-6">
                <button
                onClick={()=>navigate('/create')}
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                <PlusIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />
                    New Mint
                </button>
            </div>
            <div className='h-30 '></div>
        </div>
    )
}


export default EmptyStateMain