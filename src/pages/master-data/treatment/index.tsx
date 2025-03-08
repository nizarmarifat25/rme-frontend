import DashboardLayout from "@/components/layouts/DashboardLayout";  
import Treatment from "@/components/views/Master/Treatment"; 

const TreatmentPage = () =>{
    return (
        <DashboardLayout title="RME | Tindakan "> 
            <Treatment />
        </DashboardLayout>
    )
}

export default TreatmentPage