import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const patientServices = {
    getPatients: (params?: string) => instance.get(`${endpoint.PATIENT}?${params}`),
}

export default patientServices