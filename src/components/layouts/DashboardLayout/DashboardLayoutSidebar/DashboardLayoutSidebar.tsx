import { clearSessionCache } from "@/libs/axios/instance";
import { Button } from "@heroui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { JSX, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { getMenuIcon } from "@/utils/menu-icons";
import Image from "next/image";

interface SidebarItem {
  name: string;
  path_name: string;
  iconName: string;
  icon?: JSX.Element;
  children?: { name: string; path_name: string }[];
}

interface PropsTypes {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
  toggleSidebar: () => void;
}

const DashboardLayoutSidebar = (props: PropsTypes) => {
  const { sidebarItems, isOpen, toggleSidebar } = props;
  const router = useRouter();

  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (name: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };


  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed right-4 top-4 z-50 text-black lg:hidden"
      >
        {isOpen ? <RxCross1 size={24} /> : <RxHamburgerMenu size={24} />}
      </button>

      <div
        className={`fixed left-0 top-0 z-40 flex h-screen w-[320px] max-w-[320px] flex-col border-r border-default-200 bg-white px-4 py-6 transition-transform lg:relative ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-wrap items-center justify-center gap-2 text-center">
          <Image
            src="/images/general/logo.png"
            alt="Logo"
            width={64}
            height={64}
            className="h-16 w-16 object-contain"
          />
          <div className="max-w-[200px]">
            <h1 className="font-bold leading-tight text-green-700">
              Rekam Medis Elektronik
            </h1>
          </div>
        </div>

        <div className="sidebar-items mt-4 flex flex-grow flex-col overflow-y-auto">
          {sidebarItems.map((item, index) => {
            const IconComponent = getMenuIcon(item.iconName);
            const isOpenItem = openItems[item.name];

            return item.children && item.children.length > 0 ? (
              <div key={index} className="px-2">
                <button
                  onClick={() => toggleItem(item.name)}
                  className={`flex w-full items-center justify-between gap-2 rounded px-4 py-2 text-left ${
                    router.pathname.includes(item.path_name)
                      ? "bg-green-100 text-green-600"
                      : "hover:bg-green-100 hover:text-green-600"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {IconComponent && (
                      <IconComponent className="text-green-600" />
                    )}
                    <span>{item.name}</span>
                  </div>
                  <svg
                    className={`h-4 w-4 transform transition-transform duration-200 ${
                      isOpenItem ? "rotate-90" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpenItem
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  } mt-1 flex flex-col pl-6`}
                >
                  {item.children.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.path_name}
                      className={`my-1 rounded px-4 py-2 text-sm ${
                        router.pathname === subItem.path_name
                          ? "pointer-events-none cursor-default bg-green-100 text-green-600"
                          : "hover:bg-green-100 hover:text-green-600"
                      }`}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div key={index} className="px-2 py-2">
                <Link
                  href={item.path_name}
                  className={`flex items-center gap-2 rounded px-4 py-2 ${
                    router.pathname === item.path_name
                      ? "pointer-events-none cursor-default bg-green-100 text-green-600"
                      : "hover:bg-green-100 hover:text-green-600"
                  }`}
                >
                  {IconComponent && (
                    <IconComponent className="text-green-600" />
                  )}
                  {item.name}
                </Link>
              </div>
            );
          })}
        </div>

        <Button
          size="lg"
          fullWidth
          className="mt-auto flex justify-start rounded-lg px-2 py-1.5"
          variant="light"
          color="success"
          onPress={() => {
            clearSessionCache();
            signOut({ callbackUrl: `/auth/login` });
          }}
        >
          <CiLogout />
          Logout
        </Button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default DashboardLayoutSidebar;
