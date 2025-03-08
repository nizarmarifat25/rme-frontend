import DashboardLayout from "@/components/layouts/DashboardLayout";
import Insurance from "@/components/views/Master/Insurance/Insurance";
import Nurse from "@/components/views/Master/Nurse";

const InsurancePage = () => {
  return (
    <DashboardLayout title="RME | Asuransi ">
      <Insurance />
    </DashboardLayout>
  );
};

export default InsurancePage;
