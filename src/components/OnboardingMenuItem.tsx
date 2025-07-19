import React from "react"
import {Link} from 'react-router-dom'

interface OnboardingMenuItemProps {
    image : string, //`/onboarding/woocommerce.svg`
    title : string,
    body : string,
    link : string,
}

const OnboardingMenuItem : React.FC<OnboardingMenuItemProps> = ({image,title,body,link})=>{
    return(
        <li className="col-span-1 divide-y rounded-lg bg-white shadow-sm min-h-72 overflow-hidden">
            <div className="flex flex-col h-full">
                <img className="w-full" src={image}/>
                <div className="flex flex-col h-full justify-between p-3">
                    <div className="flex flex-col items-center mb-4">
                        <label className="text-sm font-medium mb-2">{title}</label>
                        <span className="text-xs text-center">{body}</span>
                    </div>
                    <Link to={link} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">
                        Get started
                    </Link>
                </div>
            </div>
        </li>
    )
}

export default OnboardingMenuItem