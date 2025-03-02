import DashboardLayout from "@/components/layouts/DashboardLayout";  
import Reservation from "@/components/views/Reservation";

const ReservationPage = () =>{
    return (
        <DashboardLayout title="RME | Rekam Medis "> 
            <Reservation />
        </DashboardLayout>
    )
}

export default ReservationPage