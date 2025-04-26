import { Link } from 'react-router-dom'
import { PlusCircleIcon } from '@heroicons/react/20/solid'

const PlusButton = ()=>{
    return(
      <Link
        to={'/create'}
        className="inline-flex items-center rounded-md p-2 text-sm font-semibold text-gray-400 shadow-xs hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <PlusCircleIcon className="size-6" />
      </Link>
    )
}

export default PlusButton