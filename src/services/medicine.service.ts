import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IMedicine } from "@/types/Medicine";

const medicineServices = {
    getMedicines: (params?: string) => instance.get(`${endpoint.MEDICINE}?${params}`),
    postMedicine: (payload: IMedicine) => instance.post(`${endpoint.MEDICINE}`, payload),
    editMedicine: (payload: IMedicine, id: string) => instance.put(`${endpoint.MEDICINE}/${id}`, payload),
    deleteMedicine: (id?: string) => instance.delete(`${endpoint.MEDICINE}/${id}`),

    getMedicineCategorys: () => instance.get(`${endpoint.MEDICINE_CATEGORY}`),
    
    getMedicineUnits: () => instance.get(`${endpoint.MEDICE_UNIT}`)
    
}

export default medicineServices