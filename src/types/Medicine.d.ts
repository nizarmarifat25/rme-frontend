interface IMedicine {
    code: string;
    name: string;
    category: string;
    unit: string;
    price: string;
    stock: string;
    dosage: string;
    expiry_date: string;
    medicine_id?: string;
}

interface IMedicineCategory {
    medicine_category_id: string;
    name: string;
}

interface IMedicineUnits {
    medicine_unit_id: string;
    name: string;
}

export type { IMedicine , IMedicineCategory, IMedicineUnits};
