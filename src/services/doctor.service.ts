import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const doctorServices = {
    getDoctors: (params?: string) => instance.get(`${endpoint.DOCTOR}?${params}`),
}

export default doctorServices