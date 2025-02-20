import PageHead from "@/components/commons/PageHead";
import { ReactNode, useState } from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { SIDEBAR_OWNER } from "./DashboardLayout.constans";

interface PropTypes {
  title?: string;
  children: ReactNode;
  type?: string;
}

const DashboardLayout = (props: PropTypes) => {
  const { title, children, type = "owner" } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <PageHead title={title} />
      <div className="max-w-screen-3xl 3xl:container flex">
        <DashboardLayoutSidebar
          sidebarItems={type === "owner" ? SIDEBAR_OWNER : []}
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
        />
        <div className="h-screen w-full overflow-y-auto bg-slate-100 lg:p-8">
          
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
