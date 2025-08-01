interface IReservation {
    // latest_status: string
    patient_id: number
    doctor_id: number
    anamnesis: string
}

interface IReservationStatus {
    name: string;
    description: string;
    medical_record_status_id: string
}

interface Recipe {
    quantity: string;
    medicine_id: string;
    how_to_use: string;
}

interface Treatment {
    price: number;
    treatment_id: number;
}


interface IUpdateReservation {
    diagnosis: string;
    notes?: string;
    recipes: Recipe[] | undefined;
    treatments: string;
    nurses: string;
    latest_status?: string
}

interface IUpdateStatusReservation {
    latest_status: string
}

interface ICloseReservation {
    latest_status: string
    payment_method: string
    payment_status: string
    insurance_id: string 
}


export { IReservation, IReservationStatus, IUpdateReservation, IUpdateStatusReservation, ICloseReservation }