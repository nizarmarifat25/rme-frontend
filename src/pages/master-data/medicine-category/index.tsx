import DashboardLayout from "@/components/layouts/DashboardLayout";  
import MedicineCategory from "@/components/views/Master/MedicineCategory";

const MedicineCategoryPage = () =>{
    return (
        <DashboardLayout title="RME | Ketegori Obat "> 
            <MedicineCategory />
        </DashboardLayout>
    )
}

export default MedicineCategoryPage