import DashboardLayout from "@/components/layouts/DashboardLayout";  
import Medicine from "@/components/views/Master/Medicine";

const MedicinePage = () =>{
    return (
        <DashboardLayout title="RME | Obat "> 
            <Medicine />
        </DashboardLayout>
    )
}

export default MedicinePage