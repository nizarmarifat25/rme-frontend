import DataTable from "@/components/ui/DataTable";
import { Breadcrumbs, BreadcrumbItem, Button, Tooltip } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_MEDICINE } from "./Medicine.constans";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import useMedicine from "./UseMedicine"; 

interface Medicine {
  medicine_id: number;
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
    handleChangePage,
    handleChangeSize,
    handleKeyword,
    handleClearKeyword,
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
        case "image":
          return (
            <Image
              src={`${cellValue}`}
              alt="medicine image"
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
                  aria-label="detail Obat"
                  className="flex h-8 w-8 min-w-0 items-center justify-center rounded-md border border-gray-300 p-0 text-slate-400"
                  onPress={() => push(`/owner/detail/${medicine.medicine_id}`)}
                >
                  <FaEye className="text-lg" />
                </Button>
              </Tooltip>

              <Tooltip content="Edit Obat">
                <Button
                  size="sm"
                  variant="light"
                  aria-label="edit medicine"
                  className="flex h-8 w-8 min-w-0 items-center justify-center rounded-md border border-gray-300 p-0 text-slate-400"
                  onPress={() => console.log(`Edit medicine ${medicine.medicine_id}`)}
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
                  onPress={() =>
                    console.log(`Hapus medicine ${medicine.medicine_id}`)
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
              onClickButtonTopContent={() => {}}
              data={dataMedicine?.data || []}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default Medicine;
