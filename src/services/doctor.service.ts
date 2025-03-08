import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IDoctor, IDoctorSpesialization } from "@/types/Doctor";

const doctorServices = {
    getDoctors: (params?: string) => instance.get(`${endpoint.DOCTOR}?${params}`),
    postDoctor: (payload: IDoctor) => instance.post(`${endpoint.DOCTOR}`, payload),
    editDoctor: (payload: IDoctor, id: string) => instance.put(`${endpoint.DOCTOR}/${id}`, payload),
    deleteDoctor: (id?: string) => instance.delete(`${endpoint.DOCTOR}/${id}`),

    getDoctorSpecializations: (params?: string) => instance.get(`${endpoint.DOCTOR_SPECIALIZATIONS}?${params}`),
    postDoctorSpecialization: (payload: IDoctorSpesialization) => instance.post(`${endpoint.DOCTOR_SPECIALIZATIONS}`, payload),
    editDoctorSpecialization: (payload: IDoctorSpesialization, id: string) => instance.put(`${endpoint.DOCTOR_SPECIALIZATIONS}/${id}`, payload),
    deleteDoctorSpecialization: (id?: string) => instance.delete(`${endpoint.DOCTOR_SPECIALIZATIONS}/${id}`),

    getDoctorDropdown: (params?: string) => instance.get(`${endpoint.DOCTOR_DROPDOWN}?${params}`),

}

export default doctorServices