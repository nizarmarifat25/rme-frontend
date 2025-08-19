interface IMedicine {
    code: string;
    name: string;
    category_id: string;
    unit_id: string;
    price: number;
    stock: number;
    dosage: string;
    expiry_date: string;
    medicine_id?: string;
}

interface IMedicineCategory {
    id?: string;
    name: string;
}

interface IMedicineUnit {
    id?: string;
    name: string;
}

export type { IMedicine , IMedicineCategory, IMedicineUnit};
