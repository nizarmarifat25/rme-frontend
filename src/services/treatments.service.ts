import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ITreatment } from "@/types/Treatment";

const treatmentServices = {
    getTreatments: (params?: string) => instance.get(`${endpoint.TREATMENT}?${params}`),
    postTreatment: (payload: ITreatment) => instance.post(`${endpoint.TREATMENT}`, payload),
    editTreatment: (payload: ITreatment, id: string) => instance.put(`${endpoint.TREATMENT}/${id}`, payload),
    deleteTreatment: (id?: string) => instance.delete(`${endpoint.TREATMENT}/${id}`),
}

export default treatmentServices