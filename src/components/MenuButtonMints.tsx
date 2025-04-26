import useMint from '../hooks/useMint'
import PlusButton from './PlusButton'
import EmptyStateMini from './EmptyStateMini'
import { Link } from 'react-router-dom'

const MenuButtonMints = ()=>{

    const {mint,mints} = useMint()

    function classNames(classes:string[]) {
        return classes.filter(Boolean).join(' ')
    }

    return(
        <>
            <div className={"flex items-center justify-between"}>
                <div className="text-xs/6 font-semibold text-gray-400">Token mints</div>
                <PlusButton/>
            </div>
            {mint ? 
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {mints.map((m) => (
                        <li key={m._id}>
                            <Link
                                to={`/overview/${m._id}`}
                                className={classNames([
                                    m._id === mint
                                    ? 'bg-gray-800 text-white'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                    'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                ])}
                            >
                              <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                {m.metadata.name.slice(0,1)}
                              </span>
                              <span className="truncate">{m.metadata.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            : <EmptyStateMini/>}
        </>
    )
}


export default MenuButtonMints