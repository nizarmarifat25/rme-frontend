import DataTable from "@/components/ui/DataTable";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Button,
  Tooltip,
  DatePicker,
} from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect, useState } from "react";
import { COLUMN_LISTS_MEDICINE } from "./Medicine.constans";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import useMedicine from "./UseMedicine";
import { formatRupiah } from "@/utils/currency-format";
import DeleteMedicineModal from "./DeleteMedicineModal";
import ActionMedicineModal from "./ActionMedicineModal";
import { getLocalTimeZone, now, parseDate } from "@internationalized/date";

interface Medicine {
  medicine_id: string;
  name: string;
  category: string;
  manufacturer: string;
  price: string;
  stock: string;
}

const Medicine = () => {
  const { push, isReady, query } = useRouter();
  const {
    setURL,
    dataMedicine,
    isLoadingMedicine,
    currentPage,
    currentSize,
    isRefetchingMedicine,
    refetchMedicine,
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
  } = useMedicine();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);


  const renderCell = useCallback(
    (medicine: Record<string, unknown>, columnKey: Key) => {
      const cellValue = medicine[columnKey as keyof typeof medicine];

      switch (columnKey) {
        case "price":
          return (
            <p className="font-semibold text-green-500">
              {formatRupiah(Number(cellValue))}
            </p>
          );

        case "actions":
          return (
            <div className="flex space-x-1">
              <Tooltip content="Perbaharui Obat">
                <Button
                  size="sm"
                  variant="light"
                  aria-label="edit medicine"
                  className="flex h-8 w-8 min-w-0 items-center justify-center rounded-md border border-gray-300 p-0 text-slate-400"
                  onPress={() => {
                    setIsModalOpen("edit");
                    setSelectedData(medicine);
                  }}
                >
                  <FaEdit className="text-lg" />
                </Button>
              </Tooltip>

              <Tooltip content="Hapus Obat" color="danger">
                <Button
                  size="sm"
                  variant="light"
                  aria-label="hapus medicine"
                  className="flex h-8 w-8 min-w-0 items-center justify-center rounded-md border border-gray-300 p-0 text-red-500"
                  onPress={() => {
                    setIsModalOpen("delete");
                    setSelectedId(String(medicine.medicine_id));
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
      <h1 className="mb-4 text-2xl font-semibold text-gray-700">Obat</h1>
      <div className="mb-5 mt-6">
        <Breadcrumbs>
          <BreadcrumbItem>Master Data</BreadcrumbItem>
          <BreadcrumbItem>Obat</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="min-h-[70vh] rounded-lg bg-white px-5 py-8 shadow">
        <h2 className="mb-3 px-4 text-xl font-semibold text-slate-400">
          Tabel Obat
        </h2>
        <section>
          {Object.keys(query).length > 0 && (
            <DataTable
              emptyContent="Tidak ada data obat"
              renderCell={renderCell}
              columns={COLUMN_LISTS_MEDICINE}
              size={String(currentSize)}
              onClearKeyword={handleClearKeyword}
              onChangeKeyword={handleKeyword}
              onChangeSize={handleChangeSize}
              onChangePage={handleChangePage}
              currentPage={Number(currentPage)}
              totalPage={dataMedicine?.total_pages}
              isLoading={isLoadingMedicine || isRefetchingMedicine}
              buttonTopContent="Tambah Obat"
              onClickButtonTopContent={() => setIsModalOpen("add")}
              data={dataMedicine?.data || []}
            />
          )}
        </section>
      </div>

      <ActionMedicineModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen("")}
        refetchMedicine={refetchMedicine}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />

      <DeleteMedicineModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen("")}
        refetchMedicine={refetchMedicine}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  );
};

export default Medicine;
