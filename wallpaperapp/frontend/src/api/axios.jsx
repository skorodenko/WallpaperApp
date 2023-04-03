import axios from "axios"
import { setToken } from "redux/authSlice";

const BASE_URL = "http://192.168.0.147:8000"

const REFRESH_URL = "/auth/login/refresh/"

export const clientAxios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

export function setupAxiosInterceptors(store) {
    clientAxios.interceptors.request.use(
        config => {
            config.headers = {
                ...config.headers,
                authorization: `Bearer ${store.getState().auth.token}`
            }
            return config
        },
        error => {
            return Promise.reject(error)
        }
    )

    clientAxios.interceptors.response.use(
        response => {
            return response
        },
        async err => {
            const originalConfig = err.config
            if (err?.response?.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                
                await clientAxios.post(REFRESH_URL).then((response) => {
                    store.dispatch(setToken({token: response.data.access}))
                }).catch((err) => Promise.reject(err))
                
                return clientAxios(originalConfig)
            } else if (err?.response?.status === 401) {
                // Refresh token is invalid -> log in to obtain new one.
            }
            return Promise.reject(err)
        }
    )
}