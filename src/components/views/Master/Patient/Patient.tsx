import DataTable from "@/components/ui/DataTable";
import { Breadcrumbs, BreadcrumbItem, Button, Tooltip } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_PATIENT } from "./Patient.constans";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import ActionPatientModal from "./ActionPatientModal";
import DeletePatientModal from "./DeletePatientModal";
import usePatient from "./usePatient"; 
import HeaderLayout from "@/components/ui/Header/Header";
import { string } from "yup";

const Patient = () => {
  const { push, isReady, query } = useRouter();
  const {
    setURL,
    dataPatient,
    isLoadingPatient,
    currentPage,
    currentSize,
    currentKeyword,
    isRefetchingPatient,
    refetchPatient,
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
  } = usePatient();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (patient: Record<string, unknown>, columnKey: Key) => {
      const cellValue = patient[columnKey as keyof typeof patient];

      switch (columnKey) {
        case "actions":
          return (
            <div className="flex space-x-1">
              <Tooltip content="Edit Pasien">
                <Button
                  size="sm"
                  variant="light"
                  aria-label="edit patient"
                  className="flex h-8 w-8 min-w-0 items-center justify-center rounded-md border border-gray-300 p-0 text-slate-400"
                  onPress={() => {
                    setIsModalOpen("edit");
                    setSelectedData(patient);
                  }}
                >
                  <FaEdit className="text-lg" />
                </Button>
              </Tooltip>

              <Tooltip content="Hapus Pasien" color="danger">
                <Button
                  size="sm"
                  variant="light"
                  aria-label="hapus patient"
                  className="flex h-8 w-8 min-w-0 items-center justify-center rounded-md border border-gray-300 p-0 text-red-500"
                  onPress={() => {
                    setIsModalOpen("delete");
                    setSelectedId(String(patient.id));
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
      <HeaderLayout title="Pasien" breadcrumbs={["Master Data", "Pasien"]} />
      <div className="min-h-[70vh] rounded-lg bg-white px-5 py-8 shadow">
        <h2 className="mb-3 px-4 text-xl font-semibold text-slate-400">
          Tabel Pasien
        </h2>
        <section>
          {Object.keys(query).length > 0 && (
            <DataTable
            currentKeyword={String(currentKeyword)}
              emptyContent="Tidak ada data pasien"
              renderCell={renderCell}
              columns={COLUMN_LISTS_PATIENT}
              size={String(currentSize)}
              onClearKeyword={handleClearKeyword}
              onChangeKeyword={handleKeyword}
              onChangeSize={handleChangeSize}
              onChangePage={handleChangePage}
              currentPage={Number(currentPage)}
              totalPage={dataPatient?.total_pages}
              isLoading={isLoadingPatient || isRefetchingPatient}
              buttonTopContent="Tambah Pasien"
              onClickButtonTopContent={() => setIsModalOpen("add")}
              data={dataPatient?.data || []}
            />
          )}
        </section>
      </div>

      <ActionPatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen("")}
        refetchPatient={refetchPatient}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />

      <DeletePatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen("")}
        refetchPatient={refetchPatient}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  );
};

export default Patient;
