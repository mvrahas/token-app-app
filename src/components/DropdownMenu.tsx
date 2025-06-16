import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'


interface DropdownMenuProps {
    items : Method[],
    selected : Method,
    setSelected : (input: Method) => void
}


const DropdownMenu : React.FC<DropdownMenuProps> = ({items, selected, setSelected}) => {

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative w-full">
        <ListboxButton className="flex flex-row items-center justify-between w-full p-4 cursor-default rounded-md bg-white text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300">
            <div className='flex flex-row items-center'>
                <ChevronUpDownIcon
                    className="size-5 text-gray-500"
                />
                <p className="text-sm text-black ml-2">{selected.name}</p>
            </div>
            <div className='flex flex-row items-center'>
              <span className='text-xs text-gray-400 mr-2'>{selected.symbol}</span>
              <img className="h-8 w-8 rounded-full" src={`/icons/${selected.symbol}.png`}/>
            </div>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {items.map((item) => (
            <ListboxOption
              key={item.address}
              value={item}
              className="group relative cursor-default py-2 pr-4 pl-8 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
            >
              <span className="block truncate font-normal group-data-selected:font-semibold">{item.name}</span>

              <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}

export default DropdownMenu