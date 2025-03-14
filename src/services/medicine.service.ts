import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IMedicine, IMedicineCategory, IMedicineUnit } from "@/types/Medicine";

const medicineServices = {
    getMedicines: (params?: string) => instance.get(`${endpoint.MEDICINE}?${params}`),
    postMedicine: (payload: IMedicine) => instance.post(`${endpoint.MEDICINE}`, payload),
    editMedicine: (payload: IMedicine, id: string) => instance.put(`${endpoint.MEDICINE}/${id}`, payload),
    deleteMedicine: (id?: string) => instance.delete(`${endpoint.MEDICINE}/${id}`),

    getMedicineCategories: (params?: string) => instance.get(`${endpoint.MEDICINE_CATEGORY}?${params}`),
    postMedicineCategory: (payload: IMedicineCategory) => instance.post(`${endpoint.MEDICINE_CATEGORY}`, payload),
    editMedicineCategory: (payload: IMedicineCategory, id: string) => instance.put(`${endpoint.MEDICINE_CATEGORY}/${id}`, payload),
    deleteMedicineCategory: (id?: string) => instance.delete(`${endpoint.MEDICINE_CATEGORY}/${id}`),

    
    getMedicineUnits: (params?: string) => instance.get(`${endpoint.MEDICINE_UNIT}?${params}`),
    postMedicineUnit: (payload: IMedicineUnit) => instance.post(`${endpoint.MEDICINE_UNIT}`, payload),
    editMedicineUnit: (payload: IMedicineUnit, id: string) => instance.put(`${endpoint.MEDICINE_UNIT}/${id}`, payload),
    deleteMedicineUnit: (id?: string) => instance.delete(`${endpoint.MEDICINE_UNIT}/${id}`),
    
}

export default medicineServices