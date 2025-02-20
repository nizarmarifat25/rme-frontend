import DashboardLayout from "@/components/layouts/DashboardLayout";  
import Patient from "@/components/views/Master/Patient";

const PatientPage = () =>{
    return (
        <DashboardLayout title="RME | Pasien "> 
            <Patient />
        </DashboardLayout>
    )
}

export default PatientPage