import DashboardLayout from "@/components/layouts/DashboardLayout";  
import MedicineUnit from "@/components/views/Master/MedicineUnit";

const MedicineUnitPage = () =>{
    return (
        <DashboardLayout title="RME | Satuan Obat "> 
            <MedicineUnit />
        </DashboardLayout>
    )
}

export default MedicineUnitPage