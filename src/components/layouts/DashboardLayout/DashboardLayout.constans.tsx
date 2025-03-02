import { RxDashboard } from "react-icons/rx";
import { FaUserMd, FaUserNurse, FaUsers, FaUserCog } from "react-icons/fa";
import {
  MdAssignment,
  MdSettings,
  MdOutlineMedicalServices,
} from "react-icons/md";
import { BsClipboardCheck } from "react-icons/bs";
import { RiFileList2Line } from "react-icons/ri";

const SIDEBAR_OWNER = [
  {
    name: "Master Data",
    path_name: "/master-data",
    icon: <MdOutlineMedicalServices />,
    child: [
      {
        name: "Obat",
        path_name: "/master-data/medicine",
      },
      {
        name: "Dokter",
        path_name: "/master-data/doctor",
      },
      {
        name: "Perawat",
        path_name: "/master-data/nurse",
      },
      {
        name: "Pasien",
        path_name: "/master-data/patient",
      },
    ],
  },
  {
    name: "Rekam Medis",
    path_name: "/rekam-medis",
    icon: <BsClipboardCheck />,
    child: [],
  },
  {
    name: "Laporan",
    path_name: "/laporan",
    icon: <RiFileList2Line />,
    child: [
      {
        name: "Transaksi",
        path_name: "/laporan-transaksi",
      },
      {
        name: "Keuangan",
        path_name: "/laporan-keuangan",
      },
    ],
  },
];

export { SIDEBAR_OWNER };
