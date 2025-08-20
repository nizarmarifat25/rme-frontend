import DashboardLayout from "@/components/layouts/DashboardLayout";  
import PaymentMethod from "@/components/views/Master/PaymentMethod";

const PaymentMethodPage = () =>{
    return (
        <DashboardLayout title="RME | Metode Pembayaran">
            <PaymentMethod />
        </DashboardLayout>
    )
}

export default PaymentMethodPage