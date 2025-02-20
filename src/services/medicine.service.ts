import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const medicineServices = {
    getMedicines: (params?: string) => instance.get(`${endpoint.MEDICINE}?${params}`),
}

export default medicineServices