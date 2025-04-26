import React from "react"


interface GridCardProps {
    children : React.ReactNode,
    title : string
}


const GridCard : React.FC<GridCardProps> = ({children,title})=>{
    return(
        <li className="col-span-1 divide-y rounded-lg bg-white shadow-sm h-80">
            <div className="flex flex-col h-full">
            <div className="flex w-full items-center justify-between space-x-6 p-6 border-b-1 border-gray-200">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-900">{title}</h3>
                </div>
              </div>
            </div>
            <div className="grow">
                {children}
            </div>
            </div>
        </li>
    )
}


export default GridCard