import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IMedicine } from "@/types/Medicine";

const medicineServices = {
    getMedicines: (params?: string) => instance.get(`${endpoint.MEDICINE}?${params}`),
    postMedicine: (payload: IMedicine) => instance.post(`${endpoint.MEDICINE}`, payload),
    deleteMedicine: (params?: string) => instance.delete(`${endpoint.MEDICINE}/${params}`),

    getMedicineCategorys: () => instance.get(`${endpoint.MEDICINE_CATEGORY}`),
    
    getMedicineUnits: () => instance.get(`${endpoint.MEDICE_UNIT}`)
    
}

export default medicineServices