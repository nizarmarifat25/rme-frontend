import PageHead from "@/components/commons/PageHead";
import { ReactNode, useState } from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { SIDEBAR_ADMIN } from "./DashboardLayout.constans";

interface PropTypes {
  title?: string;
  children: ReactNode;
  type?: string;
}

const DashboardLayout = (props: PropTypes) => {
  const { title, children, type = "admin" } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <PageHead title={title} />
      <div className="flex max-w-screen-3xl 3xl:container">
        <DashboardLayoutSidebar
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : []}
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
        />
        <div className="h-screen w-full overflow-y-auto p-8">{children}</div>
      </div>
    </>
  );
};

export default DashboardLayout;
