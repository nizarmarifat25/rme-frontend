import DashboardLayout from "@/components/layouts/DashboardLayout";  
import Treatment from "@/components/views/Master/Treatment"; 

const TreatmentPage = () =>{
    return (
        <DashboardLayout title="RME | Perawatan"> 
            <Treatment />
        </DashboardLayout>
    )
}

export default TreatmentPage