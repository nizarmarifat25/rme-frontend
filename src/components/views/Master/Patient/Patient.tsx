import DataTable from "@/components/ui/DataTable";
import { Breadcrumbs, BreadcrumbItem, Button, Tooltip } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_PATIENT } from "./Patient.constans";  
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import usePatient from "./usePatient"; 

interface Patient {
  patient_id: number;
  name: string;
  age: number;
  gender: string;
  diagnosis: string;
  room: string;
}

const Patient = () => {
  const { push, isReady, query } = useRouter();
  const {
    setURL,
    dataPatient,
    isLoadingPatient,
    currentPage,
    currentSize,
    isRefetchingPatient,
    handleChangePage,
    handleChangeSize,
    handleKeyword,
    handleClearKeyword,
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
        case "image":
          return (
            <Image
              src={`${cellValue}`}
              alt="patient image"
              width={100}
              height={200}
            />
          );

        case "actions":
          return (
            <div className="flex space-x-1">
              <Tooltip content="Lihat Detail">
                <Button
                  size="sm"
                  variant="light"
                  aria-label="detail Pasien"
                  className="flex h-8 w-8 min-w-0 items-center justify-center rounded-md border border-gray-300 p-0 text-slate-400"
                  onPress={() => push(`/owner/detail/${patient.patient_id}`)}
                >
                  <FaEye className="text-lg" />
                </Button>
              </Tooltip>

              <Tooltip content="Edit Pasien">
                <Button
                  size="sm"
                  variant="light"
                  aria-label="edit patient"
                  className="flex h-8 w-8 min-w-0 items-center justify-center rounded-md border border-gray-300 p-0 text-slate-400"
                  onPress={() => console.log(`Edit patient ${patient.patient_id}`)}
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
                  onPress={() =>
                    console.log(`Hapus patient ${patient.patient_id}`)
                  }
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
      <h1 className="mb-4 text-2xl font-semibold text-gray-700">Pasien</h1>
      <div className="mb-5 mt-6">
        <Breadcrumbs>
          <BreadcrumbItem>Master Data</BreadcrumbItem>
          <BreadcrumbItem>Pasien</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="min-h-[70vh] rounded-lg bg-white px-5 py-8 shadow">
        <h2 className="mb-3 px-4 text-xl font-semibold text-slate-400">
          Tabel Pasien
        </h2>
        <section>
          {Object.keys(query).length > 0 && (
            <DataTable
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
              onClickButtonTopContent={() => {}}
              data={dataPatient?.data || []}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default Patient;
