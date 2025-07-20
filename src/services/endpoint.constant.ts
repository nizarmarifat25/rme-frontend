const baseURL = process.env.NEXT_PUBLIC_API_URL;

const endpoint = {
    // AUTH: "/auth",
    AUTH: `${baseURL}:8080/api/v1/auth`,
    DOCTOR: `${baseURL}:8081/api/v1/doctors`,
    DOCTOR_DROPDOWN: "/doctors/dropdown",
    DOCTOR_SPECIALIZATIONS: `${baseURL}:8081/api/v1/specializations`,
    MEDICINE: "/medicines",
    MEDICINE_CATEGORY: "/medicine/categories",
    MEDICINE_UNIT: "/medicine/units",
    NURSE: "/nurses",
    PATIENT: "/patients",
    MEDICAL_RECORD: "/medical-records",
    TREATMENT: "/treatments",
    INSURANCE: "/insurances",
    PAYMENT_METHOD: "/payments",
    TRANSACTION: "/transactions",
}

export default endpoint