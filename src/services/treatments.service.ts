import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IPatient } from "@/types/Patient";
import { IReservation, IUpdateReservation } from "@/types/Reservation";

const treatmentServices = {
    getTreatments: (params?: string) => instance.get(`${endpoint.TREATMENT}`),
}

export default treatmentServices