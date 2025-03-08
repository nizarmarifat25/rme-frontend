import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IInsurance } from "@/types/Insurance";

const insuranceServices = {
    getInsurances: (params?: string) => instance.get(`${endpoint.INSURANCE}?${params}`),
    postInsurance: (payload: IInsurance) => instance.post(`${endpoint.INSURANCE}`, payload),
    editInsurance: (payload: IInsurance, id: string) => instance.put(`${endpoint.INSURANCE}/${id}`, payload),
    deleteInsurance: (id?: string) => instance.delete(`${endpoint.INSURANCE}/${id}`),
}

export default insuranceServices