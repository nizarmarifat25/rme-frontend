import DashboardLayout from "@/components/layouts/DashboardLayout";  
import DoctorSpecialization from "@/components/views/Master/DoctorSpecialization";

const DoctorSpecializationPage = () =>{
    return (
        <DashboardLayout title="RME | Dokter Spesialis "> 
            <DoctorSpecialization />
        </DashboardLayout>
    )
}

export default DoctorSpecializationPage