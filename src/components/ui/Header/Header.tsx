import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";

interface HeaderLayoutProps {
  title: string;
  breadcrumbs: string[];
}

const HeaderLayout = ({ title, breadcrumbs }: HeaderLayoutProps) => {
  return (
    <div className="relative mb-6 overflow-hidden rounded-lg bg-green-600/10 p-6 backdrop-blur-sm">
      <img
        src="/images/illustration/stethoscope.png"
        alt="Revenue Illustration"
        className="absolute right-4 top-2 w-44 opacity-30"
      />
      <h1 className="mb-2 text-2xl font-semibold text-green-700">{title}</h1>
      <div>
        <Breadcrumbs>
          {breadcrumbs.map((crumb, index) => (
            <BreadcrumbItem key={index}>{crumb}</BreadcrumbItem>
          ))}
        </Breadcrumbs>
      </div>
    </div>
  );
};

export default HeaderLayout;
