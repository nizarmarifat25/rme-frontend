import { Button, Accordion, AccordionItem } from "@heroui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { JSX } from "react";
import { CiLogout } from "react-icons/ci";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";

interface SidebarItem {
  name: string;
  path_name: string;
  icon: JSX.Element;
  child?: { name: string; path_name: string }[];
}

interface PropsTypes {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
  toggleSidebar: () => void;
}

const DashboardLayoutSidebar = (props: PropsTypes) => {
  const { sidebarItems, isOpen, toggleSidebar } = props;
  const router = useRouter();

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
        <div className="text-center text-3xl font-semibold text-green-400">
          RME
        </div>
        <div className="sidebar-items mt-4 flex flex-grow flex-col gap-2 overflow-y-auto">
          {sidebarItems.map((item, index) =>
            item.child && item.child.length > 0 ? (
              <div key={index} className="px-2">
                <Accordion className="w-full">
                  <AccordionItem
                    title={
                      <div
                        className={`flex items-center gap-2 rounded px-4 py-2 ${
                          router.pathname.includes(item.path_name)
                            ? "bg-green-100 text-green-600"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {item.icon} {item.name}
                      </div>
                    }
                  >
                    <div className="flex flex-col pl-4">
                      {item.child.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.path_name}
                          className={`rounded px-4 py-2 ${
                            router.pathname === subItem.path_name
                              ? "pointer-events-none cursor-default bg-green-100 text-green-600"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </AccordionItem>
                </Accordion>
              </div>
            ) : (
              <div key={index} className="px-4 py-2">
                <Link
                  href={item.path_name}
                  className={`flex items-center gap-2 rounded px-4 py-2 ${
                    router.pathname === item.path_name
                      ? "pointer-events-none cursor-default bg-green-100 text-green-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {item.icon} {item.name}
                </Link>
              </div>
            ),
          )}
        </div>
        <Button
          size="lg"
          fullWidth
          className="mt-auto flex justify-start rounded-lg px-2 py-1.5"
          variant="light"
          color="success"
          onPress={() => signOut({ callbackUrl: "/auth/login" })}
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
