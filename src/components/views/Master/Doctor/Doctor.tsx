import DataTable from "@/components/ui/DataTable";
import { Breadcrumbs, BreadcrumbItem, Button, Tooltip } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Dispatch,
  Key,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";
import { COLUMN_LISTS_DOCTOR } from "./Doctor.constans";
import { FaEdit, FaTrash } from "react-icons/fa";
import useDoctor from "./UseDoctor";
import ActionDoctorModal from "./ActionDoctorModal";
import DeleteDoctorModal from "./DeleteDoctorModal";

interface Doctor {
  doctor_id: number;
  name: string;
  gender: string;
  specialization: string;
  phone: string;
  registration_date: string;
  selectedData: Record<string, unknown>;
  setSelectedData: Dispatch<SetStateAction<Record<string, unknown>>>;
}

const Doctor = () => {
  const { push, isReady, query } = useRouter();
  const {
    setURL,
    dataDoctor,
    isLoadingDoctor,
    currentPage,
    currentSize,
    isRefetchingDoctor,
    refetchDoctor,
    handleChangePage,
    handleChangeSize,
    handleKeyword,
    handleClearKeyword,
    isModalOpen,
    setIsModalOpen,
    selectedId,
    setSelectedId,
    selectedData,
    setSelectedData,
  } = useDoctor();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (doctor: Record<string, unknown>, columnKey: Key) => {
      const cellValue = doctor[columnKey as keyof typeof doctor];

      switch (columnKey) {
        case "image":
          return (
            <Image
              src={`${cellValue}`}
              alt="profile image"
              width={100}
              height={200}
            />
          );

        case "actions":
          return (
            <div className="flex space-x-1">
              <Tooltip content="Perbaharui Dokter">
                <Button
                  size="sm"
                  variant="light"
                  aria-label="edit dokter"
                  className="flex h-8 w-8 min-w-0 items-center justify-center rounded-md border border-gray-300 p-0 text-slate-400"
                  onPress={() => {
                    setIsModalOpen("edit");
                    setSelectedData(doctor);
                  }}
                >
                  <FaEdit className="text-lg" />
                </Button>
              </Tooltip>

              <Tooltip content="Hapus Dokter" color="danger">
                <Button
                  size="sm"
                  variant="light"
                  aria-label="hapus dokter"
                  className="flex h-8 w-8 min-w-0 items-center justify-center rounded-md border border-gray-300 p-0 text-red-500"
                  onPress={() => {
                    setIsModalOpen("delete");
                    setSelectedId(String(doctor.doctor_id));
                  }}
                >
                  <FaTrash className="text-lg" />
                </Button>
              </Tooltip>
            </div>
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <div className="mx-auto p-4">
      <h1 className="mb-4 text-2xl font-semibold text-gray-700">Dokter</h1>
      <div className="mb-5 mt-6">
        <Breadcrumbs>
          <BreadcrumbItem>Master Data</BreadcrumbItem>
          <BreadcrumbItem>Dokter</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="min-h-[70vh] rounded-lg bg-white px-5 py-8 shadow">
        <h2 className="mb-3 px-4 text-xl font-semibold text-slate-400">
          Tabel dokter
        </h2>
        <section>
          {Object.keys(query).length > 0 && (
            <DataTable
              emptyContent="Tidak ada data dokter"
              renderCell={renderCell}
              columns={COLUMN_LISTS_DOCTOR}
              size={String(currentSize)}
              onClearKeyword={handleClearKeyword}
              onChangeKeyword={handleKeyword}
              onChangeSize={handleChangeSize}
              onChangePage={handleChangePage}
              currentPage={Number(currentPage)}
              totalPage={dataDoctor?.total_pages}
              isLoading={isLoadingDoctor || isRefetchingDoctor}
              buttonTopContent="Tambah Dokter"
              onClickButtonTopContent={() => setIsModalOpen("add")}
              data={dataDoctor?.data || []}
            />
          )}
        </section>
      </div>

      <ActionDoctorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen("")}
        refetchDoctor={refetchDoctor}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />

      <DeleteDoctorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen("")}
        refetchDoctor={refetchDoctor}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  );
};

export default Doctor;
