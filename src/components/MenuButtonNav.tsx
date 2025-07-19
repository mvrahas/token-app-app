import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import { HomeIcon, GiftIcon, PaperAirplaneIcon, LinkIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'


const MenuButtonNav = ()=>{

    const {pathname} = useLocation()

    const items = [
        { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
        { name: 'Send', href: '/send', icon: PaperAirplaneIcon, current: false },
        { name: 'Receive', href: '/receive', icon: LinkIcon, current: false },
        { name: 'Mint', href: '/mint', icon: GiftIcon, current: false },
        { name: 'Settings', href: '/settings', icon: Cog6ToothIcon, current: false },
    ]

    function classNames(classes:string[]) {
        return classes.filter(Boolean).join(' ')
    }

    return(
        <>
            <ul role="list" className="space-y-1">
            {items.map((item) => (
                <li key={item.name}>
                    <Link
                        to={`${item.href}`}
                        className={classNames([
                            pathname==='/' && item.href==='/' ? 'bg-gray-800 text-white' : pathname!=='/' && item.href!=='/' && pathname.startsWith(item.href) ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                            'w-full group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold cursor-pointer',
                        ])}
                    >
                      <item.icon className="size-6 shrink-0"/>
                      {item.name}
                    </Link>
                </li>
            ))}
            </ul>
        </>
    )
}


export default MenuButtonNav