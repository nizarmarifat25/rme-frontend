import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ILogin } from "@/types/Auth";

const authServices = {
    login: async (payload: ILogin) => {
        try {
            const response = await instance.post(`${endpoint.AUTH}/login`, payload);
            return response;
        } catch (error: any) {
            return {
                status: error.response?.status || 500,
                data: { message: error.response?.data?.message || "Internal Server Error" }
            };
        }
    }
}


export default authServices