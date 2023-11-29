import { axiosAuth } from "@/service/axios-instance"
import { RootState } from "@/store/persistStore"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const useAxiosAuth = () => {
    const { auth } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        const requestIntercept = axiosAuth.interceptors.request.use((config) => {
            if(!config.headers.Authorization){
                config.headers.Authorization = auth.accessToken;
            }
            return config;
        });
        return () => {
            axiosAuth.interceptors.request.eject(requestIntercept)
        }
    }, [])

    return axiosAuth;
}

export default useAxiosAuth;