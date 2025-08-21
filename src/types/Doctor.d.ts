interface IDoctor {
    name: string;
    gender: string;
    address: string;
    specialization_id: string;
    registration_number: string;
    phone: string;
    sharing_fee: number;
    email: string;
    // password: string;
}

interface IDoctorSpesialization {
    id?: string;
    name: string
}

interface IDoctorDropdown {
    id: number
    specialization: string
    name: string
}


export type { IDoctor, IDoctorSpesialization, IDoctorDropdown };
