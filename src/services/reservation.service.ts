import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IPatient } from "@/types/Patient";
import { ICloseReservation, IReservation, IUpdateReservation, IUpdateStatusReservation } from "@/types/Reservation";

const reservationServices = {
    getReservations: (params?: string) => instance.get(`${endpoint.MEDICAL_RECORD}/daily?${params}`),
    postReservation: (payload: IReservation) => instance.post(`${endpoint.MEDICAL_RECORD}`, payload),
    updateResultReservation: (payload: IUpdateReservation, id: string) => instance.post(`${endpoint.MEDICAL_RECORD}/${id}/result`, payload),
    updateStatusReservation: (payload: IUpdateStatusReservation, id: string) => instance.put(`${endpoint.MEDICAL_RECORD}/${id}/status`, payload),
    closeReservation: (payload: ICloseReservation, id: string) => instance.put(`${endpoint.MEDICAL_RECORD}/${id}/close`, payload),
    
    getReservationStatus: () => instance.get(`${endpoint.MEDICAL_RECORD}/status`),

    getMedicalRecord: (params?: string) => instance.get(`${endpoint.MEDICAL_RECORD}?${params}`),
}

export default reservationServices