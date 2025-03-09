import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IMedicine, IMedicineCategory } from "@/types/Medicine";

const medicineServices = {
    getMedicines: (params?: string) => instance.get(`${endpoint.MEDICINE}?${params}`),
    postMedicine: (payload: IMedicine) => instance.post(`${endpoint.MEDICINE}`, payload),
    editMedicine: (payload: IMedicine, id: string) => instance.put(`${endpoint.MEDICINE}/${id}`, payload),
    deleteMedicine: (id?: string) => instance.delete(`${endpoint.MEDICINE}/${id}`),

    getMedicineCategories: (params?: string) => instance.get(`${endpoint.MEDICINE_CATEGORY}?${params}`),
    postMedicineCategory: (payload: IMedicineCategory) => instance.post(`${endpoint.MEDICINE_CATEGORY}`, payload),
    editMedicineCategory: (payload: IMedicineCategory, id: string) => instance.put(`${endpoint.MEDICINE_CATEGORY}/${id}`, payload),
    deleteMedicineCategory: (id?: string) => instance.delete(`${endpoint.MEDICINE_CATEGORY}/${id}`),

    
    getMedicineUnits: () => instance.get(`${endpoint.MEDICE_UNIT}`)
    
}

export default medicineServices