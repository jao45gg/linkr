import axios from "axios";
export default axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL
})

export const axiosPrivate = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

export const publish = async (body, token) => {

    const config = { headers: { Authorization: `Bearer ${token}` } }
    const promise = await axios.post(`${import.meta.env.VITE_APP_API_URL}/publish/post`, body, config)
    return promise
}

export const getPublish = async () => {
    const promise = await axios.get(`${import.meta.env.VITE_APP_API_URL}/publish/post`)
    return promise
}