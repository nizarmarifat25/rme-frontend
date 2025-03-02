import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IDoctor } from "@/types/Doctor";

const doctorServices = {
    getDoctors: (params?: string) => instance.get(`${endpoint.DOCTOR}?${params}`),
    postDoctor: (payload: IDoctor) => instance.post(`${endpoint.DOCTOR}`, payload),
    editDoctor: (payload: IDoctor, id: string) => instance.put(`${endpoint.DOCTOR}/${id}`, payload),
    deleteDoctor: (id?: string) => instance.delete(`${endpoint.DOCTOR}/${id}`),

    getDoctorSpecializations: () => instance.get(`${endpoint.DOCTOR_SPECIALIZATIONS}`),
    getDoctorDropdown: (params?: string) => instance.get(`${endpoint.DOCTOR_DROPDOWN}?${params}`),

}

export default doctorServices