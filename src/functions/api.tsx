import axios from 'axios'


export const BASE_URL = import.meta.env.VITE_BASE_URL


const api = axios.create({
    baseURL:BASE_URL
})


const get = (path:string)=>{
    const token = localStorage.getItem('auth')
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return api.get(path)
}


const post = (path:string,body:object)=>{
    const token = localStorage.getItem('auth')
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return api.post(path,body)
}


const patch = (path:string,body:object)=>{
    const token = localStorage.getItem('auth')
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return api.patch(path,body)
}


export default {
    get,
    post,
    patch,
}