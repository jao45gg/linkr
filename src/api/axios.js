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
    const promise = await axios.post(`${import.meta.env.VITE_APP_API_URL}/posts/`, body, config)
    return promise
}

export const getPublish = async () => {
    const promise = await axios.get(`${import.meta.env.VITE_APP_API_URL}/posts/`)
    return promise
}

export const likePost = async (id, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } }
    const promise = await axios.post(`${import.meta.env.VITE_APP_API_URL}/posts/likes/${id}`, {}, config)
    return promise
}

export const disLikePost = async (id, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } }
    const promise = await axios.post(`${import.meta.env.VITE_APP_API_URL}/posts/disliked/${id}`, {}, config)
    return promise
}


export const getLikes = async (token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } }
    const promise = await axios.get(`${import.meta.env.VITE_APP_API_URL}/posts/isliked`, config)
    return promise
}

export const getPeople = async (id, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } }
    const promise = await axios.get(`${import.meta.env.VITE_APP_API_URL}/posts/liked/${id}`, config)
    return promise
}