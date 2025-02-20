import DashboardLayout from "@/components/layouts/DashboardLayout";  
import Nurse from "@/components/views/Master/Nurse";

const NursePage = () =>{
    return (
        <DashboardLayout title="RME | Perawat "> 
            <Nurse />
        </DashboardLayout>
    )
}

export default NursePage