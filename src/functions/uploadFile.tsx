import api from "./api"
const uploadFile = async (file:File,type:string)=>{
    const response = await api.post('/upload',{type})
    const {url,link} = response.data
    await fetch(url,{
        method: "PUT",
        body: file,
    })
    return link
}
export default uploadFile