import DashboardLayout from "@/components/layouts/DashboardLayout";  
import Dashboard from "@/components/views/Dashboard";
const LoginPage = () =>{
    return (
        <DashboardLayout title="RME | Dashboard "> 
            <Dashboard />
        </DashboardLayout>
    )
}

export default LoginPage