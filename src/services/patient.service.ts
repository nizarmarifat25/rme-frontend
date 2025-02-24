import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IPatient } from "@/types/Patient";

const patientServices = {
    getPatients: (params?: string) => instance.get(`${endpoint.PATIENT}?${params}`),
    postPatient: (payload: IPatient) => instance.post(`${endpoint.PATIENT}`, payload),
    editPatient: (payload: IPatient, id: string) => instance.put(`${endpoint.PATIENT}/${id}`, payload),
    deletePatient: (id?: string) => instance.delete(`${endpoint.PATIENT}/${id}`),
}

export default patientServices