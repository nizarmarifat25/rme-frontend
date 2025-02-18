import { RxDashboard } from "react-icons/rx";
import { FaUserMd, FaUserNurse, FaUsers, FaUserCog } from "react-icons/fa";
import {
  MdAssignment,
  MdSettings,
  MdOutlineMedicalServices,
} from "react-icons/md";
import { BsClipboardCheck } from "react-icons/bs";

const SIDEBAR_ADMIN = [
  {
    name: "Dashboard",
    path_name: "/admin/dashboard",
    icon: <RxDashboard />,
    child: [],
  },
  {
    name: "Dokter",
    path_name: "/admin/dokter",
    icon: <FaUserMd />,
    child: [
      {
        name: "Dokter 1",
        path_name: "/admin/dokter/1",
      },
      {
        name: "Dokter 2",
        path_name: "/admin/dokter/2",
      },
    ],
  },
  {
    name: "Perawat",
    path_name: "/admin/perawat",
    icon: <FaUserNurse />,
    child: [],
  },
  {
    name: "Pasien",
    path_name: "/admin/pasien",
    icon: <FaUsers />,
    child: [],
  },
  {
    name: "Rekam Medis",
    path_name: "/admin/rekam-medis",
    icon: <BsClipboardCheck />,
    child: [],
  },
  {
    name: "Jadwal",
    path_name: "/admin/jadwal",
    icon: <MdAssignment />,
    child: [
      {
        name: "Jadwal Dokter",
        path_name: "/admin/jadwal/dokter",
      },
      {
        name: "Jadwal Perawat",
        path_name: "/admin/jadwal/perawat",
      },
    ],
  },
  {
    name: "Layanan",
    path_name: "/admin/layanan",
    icon: <MdOutlineMedicalServices />,
    child: [],
  },
  {
    name: "Pengguna",
    path_name: "/admin/pengguna",
    icon: <FaUserCog />,
    child: [
      {
        name: "Admin",
        path_name: "/admin/pengguna/admin",
      },
      {
        name: "Dokter",
        path_name: "/admin/pengguna/dokter",
      },
      {
        name: "Pasien",
        path_name: "/admin/pengguna/pasien",
      },
    ],
  },
  {
    name: "Pengaturan",
    path_name: "/admin/pengaturan",
    icon: <MdSettings />,
    child: [],
  },
];

export { SIDEBAR_ADMIN };
