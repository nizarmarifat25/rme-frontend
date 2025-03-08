interface IDoctor {
    name: string;
    gender: string;
    address: string;
    specialization: string;
    registration_number: string;
    phone: string;
    sharing_fee: string;
    email: string;
    password: string;
}

interface IDoctorSpesialization {
    doctor_specialization_id?: number;
    name: string
}

interface IDoctorDropdown {
    doctor_id: number
    specialization: string
    name: string
}


export type { IDoctor, IDoctorSpesialization, IDoctorDropdown };
