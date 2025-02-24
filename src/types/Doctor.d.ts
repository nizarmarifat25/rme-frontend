interface IDoctor {
    name: string;
    gender: string;
    address: string;
    specialization: string;
    // registration_number: string;
    phone: string;
    sharing_fee: string;
    email: string;
    password: string;
}

interface IDoctorSpesializations {
    doctor_specialization_id: number,
    name: string
}


export type { IDoctor , IDoctorSpesializations};
