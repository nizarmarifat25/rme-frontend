import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { INurse } from "@/types/Nurse";

const nurseServices = {
    getNurses: (params?: string) => instance.get(`${endpoint.NURSE}?${params}`),
    postNurse:(payload: INurse) => instance.post(`${endpoint.NURSE}`, payload),
    editNurse: (payload: INurse, id: string) => instance.put(`${endpoint.NURSE}/${id}`, payload),
    deleteNurse: (id?: string) => instance.delete(`${endpoint.NURSE}/${id}`),
    
}

export default nurseServices