interface IPatient {
    name: string;
    gender: string;
    address: string;
    phone: string;
    email: string;
    allergies?: string;
    insurance: string;
    birth_date: string;
    blood_type: string;
    history_of_illness?: string;
    emergency_contact: string;
    emergency_contact_phone: string;
    emergency_contact_relation: string;
    insurance_number: string;
    identity_type: string;
    identity_number: string;
}

export { IPatient }
