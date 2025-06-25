import DashboardLayout from "@/components/layouts/DashboardLayout";  
import Transaction from "@/components/views/Report/Transaction";

const TransactionPage = () =>{
    return (
        <DashboardLayout title="RME | Transaksi "> 
            <Transaction />
        </DashboardLayout>
    )
}

export default TransactionPage