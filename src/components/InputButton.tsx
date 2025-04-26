import React,{useState} from "react"


interface InputButtonProps {
    symbol : string,
    label : string,
    onClick : Function
}


const InputButton : React.FC<InputButtonProps> = ({symbol,label,onClick})=>{

    const [amount,setAmount] = useState(0)

    const handleClick = async ()=>{
        try{
            await onClick(amount)
        }catch(e){
            console.log(e)
        }
    }

    const handleInput = (e : React.ChangeEvent<HTMLInputElement>)=>{
          const val = e.target.value
          setAmount(Number(val))
    }

    return (
        <div className="flex flex-row">
            <div className="flex grow items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                <input
                  id={label}
                  name="price"
                  type="number"
                  placeholder="0"
                  value={amount === 0 ? '' : amount}
                  onChange={handleInput}
                  className="block w-full grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 appearance-none"
                />
                <div id="price-currency" className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                  {symbol}
                </div>
            </div>
            <div className="ml-2">
                <button
                  type="button"
                  onClick={handleClick}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                >
                    <span className="text-nowrap">{label}</span>
                </button>
            </div>
        </div>
    )
}


export default InputButton