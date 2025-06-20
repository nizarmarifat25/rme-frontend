import {
  MdDashboard,
  MdSettings,
  MdMedicalServices,
  MdPeople,
  MdReport,
} from "react-icons/md";
import type { IconType } from "react-icons";

export function getMenuIcon(name: string): IconType | null {
  switch (name) {
    case "Dashboard":
      return MdDashboard;
    case "Master Data":
      return MdSettings;
    case "Rekam Medis":
      return MdMedicalServices;
    case "Kunjungan Pasien":
      return MdPeople;
    case "Laporan":
      return MdReport;
    default:
      return null;
  }
}
