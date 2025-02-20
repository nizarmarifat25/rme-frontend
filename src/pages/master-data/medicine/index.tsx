import DashboardLayout from "@/components/layouts/DashboardLayout";  
import Medicine from "@/components/views/Master/Medicine";

const MedicinePage = () =>{
    return (
        <DashboardLayout title="RME | Medicine "> 
            <Medicine />
        </DashboardLayout>
    )
}

export default MedicinePage