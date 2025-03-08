import DashboardLayout from "@/components/layouts/DashboardLayout";  
import MedicalRecord from "@/components/views/MeidicalRecord";

const MedicalRecordPage = () =>{
    return (
        <DashboardLayout title="RME | Rekam Medis "> 
            <MedicalRecord />
        </DashboardLayout>
    )
}

export default MedicalRecordPage