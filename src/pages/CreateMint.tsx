import {useState,ChangeEvent,FormEvent,useRef} from 'react'
import api from '../functions/api'
import getImageDimensions from '../functions/getImageDimensions'
import uploadFile from '../functions/uploadFile'
import {Link,useNavigate} from 'react-router-dom'
import { PhotoIcon } from '@heroicons/react/24/solid'


const CreateMint = ()=>{


    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')


    const [tokenName, setTokenName] = useState('')
    const [tokenSymbol, setTokenSymbol] = useState('')
    const [tokenDescription, setTokenDescription] = useState('')
    const [tokenImage, setTokenImage] = useState<File|undefined>()


    //CREATE MINT
    const create = async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setError('')
        setLoading(true)
        try{

          //validate required fields
          if(!tokenImage){
            setError('Please upload an image!')
            setLoading(false)
            return
          }

          //create metadata
          const tokenImageURI = await uploadFile(tokenImage,'png')
          const metaplexMetadata = {
              name: tokenName,
              symbol: tokenSymbol,
              description: tokenDescription,
              image: tokenImageURI,
          }
          const jsonString = JSON.stringify(metaplexMetadata)
          const jsonFile = new File([jsonString],"metadata.json",{type: "application/json"})
          const metaplexMetadataURI = await uploadFile(jsonFile,'json')

          //api call to create mint
          await api.post('/mint',{
            metadata:metaplexMetadata,
            metadataURI:metaplexMetadataURI,
          })
            
          //ok->
          navigate(`/tokens`)

        }catch(e){
          console.log(e)
          setError('Oops! Something went wrong. Please try again.')
        }
        setLoading(false)
    }


    //IMAGE UPLOAD CLICK
    const tokenImageInput = useRef<HTMLInputElement>(null)
    const [inputError,setInputError] = useState('')
    const handleFileChange = async (event:ChangeEvent<HTMLInputElement>) => {
        setInputError('')
        const clearInput = ()=>{
            if(tokenImageInput.current){
                tokenImageInput.current.value = ''
            }
        }
        //get the image file
        if(!event.target.files){return}
        const imageFile = event.target.files[0]
        //check image dimesions
        const dimensions = await getImageDimensions(imageFile)
        if(dimensions.width !== 500 || dimensions.height !== 500){
            clearInput()
            setInputError('Please upload a PNG (500 x 500 px)')
            setTokenImage(undefined)
            return
        }
        //set the image
        setTokenImage(imageFile)

    }


    //IMAGE UPLOAD DRAG
    const [dragActive, setDragActive] = useState(false);
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      setDragActive(true)
    };
    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      setDragActive(false)
    };
    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      setDragActive(false)
      setInputError('')
      //get the image file
      if(!event.dataTransfer.files){return}
      const imageFile = event.dataTransfer.files[0]
      //check image dimesions
      const dimensions = await getImageDimensions(imageFile)
      if(dimensions.width !== 500 || dimensions.height !== 500){
          setInputError('Please upload a PNG (500 x 500 px)')
          setTokenImage(undefined)
          return
      }
      //set the image
      setTokenImage(imageFile)
    }


    return (
        <form onSubmit={create}>
          <div className="space-y-12">



            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
              <div>
                <h2 className="text-base/7 font-semibold text-gray-900">Metadata</h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Provide metadata for your mint to tell users more about your token and how it can be used.
                </p>
              </div>
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">


                <div className="sm:col-span-4">
                    <label htmlFor="tokenName" className="block text-sm/6 font-medium text-gray-900">
                        Name:
                    </label>
                    <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                            <input
                                type="text"
                                id="tokenName"
                                name="tokenName"
                                value={tokenName}
                                placeholder="Coffee Beans"
                                onChange={(e:ChangeEvent<HTMLInputElement>)=>{setTokenName(e.target.value)}}
                                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                required
                            />
                        </div>
                    </div>
                </div>


                <div className="sm:col-span-4">
                    <label htmlFor="tokenSymbol" className="block text-sm/6 font-medium text-gray-900">
                        Symbol:
                    </label>
                    <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                            <input
                                type="text"
                                id="tokenSymbol"
                                name="tokenSymbol"
                                placeholder="CFBS"
                                value={tokenSymbol}
                                onChange={(e:ChangeEvent<HTMLInputElement>)=>{setTokenSymbol(e.target.value.toUpperCase())}}
                                className="uppercase block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                required
                            />
                        </div>
                    </div>
                </div>


                <div className="sm:col-span-4">
                <label htmlFor="tokenDescription" className="block text-sm/6 font-medium text-gray-900">
                    Decription:
                </label>
                  <div className="mt-2">
                  <textarea
                    id="tokenDescription"
                    name="tokenDescription"
                    rows={3}
                    placeholder="Redeem coffee bean tokens for free coffee and donuts at any participating coffee shop in the network."
                    value={tokenDescription}
                    onChange={(e:ChangeEvent<HTMLTextAreaElement>)=>{setTokenDescription(e.target.value)}}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    required
                />
                  </div>
                </div>


                <div className="sm:col-span-4">
                  <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                    Image
                  </label>
                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop} 
                    className={`mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed ${dragActive ? 'border-indigo-400' : 'border-gray-900/25'} px-6 py-10`}
                  >
                    {tokenImage ? <img className="h-16 w-16" src={URL.createObjectURL(tokenImage)}/> : null}
                    <div className="text-center">
                      {tokenImage ? null : <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />}
                      <div className="mt-4 flex text-sm/6 text-gray-600">
                        <label
                          htmlFor="tokenImage"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input 
                            id="tokenImage"
                            name="tokenImage"
                            type="file"
                            accept="image/png"
                            onChange={handleFileChange}
                            ref={tokenImageInput}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs/5 text-gray-600">PNG (500 x 500 px)</p>
                    </div>
                    {inputError ? <p className="text-xs/5 text-red-500">{inputError}</p> : null}
                  </div>
                </div>


              </div>
            </div>


            
          </div>
    


          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link to={'/tokens'} className="text-sm/6 font-semibold text-gray-900">
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
            >
              {loading ? 'Loading...' : 'Create'}
            </button>
          </div>
          {error ? <p className="mt-6 flex items-center justify-end gap-x-6 text-red-400">{error}</p> : null}



        </form>
        

      )


}

export default CreateMint