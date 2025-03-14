interface IMedicine {
    code: string;
    name: string;
    category_id: string;
    unit_id: string;
    price: string;
    stock: string;
    dosage: string;
    expiry_date: string;
    medicine_id?: string;
}

interface IMedicineCategory {
    medicine_category_id?: string;
    name: string;
}

interface IMedicineUnit {
    medicine_unit_id?: string;
    name: string;
}

export type { IMedicine , IMedicineCategory, IMedicineUnit};
