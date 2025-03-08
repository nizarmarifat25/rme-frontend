import DashboardLayout from "@/components/layouts/DashboardLayout";  
import Doctor from "@/components/views/Master/Doctor";

const DoctorPage = () =>{
    return (
        <DashboardLayout title="RME | Dokter "> 
            <Doctor />
        </DashboardLayout>
    )
}

export default DoctorPage