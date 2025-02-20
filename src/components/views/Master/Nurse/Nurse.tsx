import DataTable from "@/components/ui/DataTable";
import { Breadcrumbs, BreadcrumbItem, Button, Tooltip } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_NURSE } from "./Nurse.constans";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import useNurse from "./useNurse"; 

interface Nurse {
  nurse_id: number;
  name: string;
  department: string;
  hospital: string;
  salary: string;
  shift: string;
}

const Nurse = () => {
  const { push, isReady, query } = useRouter();
  const {
    setURL,
    dataNurse,
    isLoadingNurse,
    currentPage,
    currentSize,
    isRefetchingNurse,
    handleChangePage,
    handleChangeSize,
    handleKeyword,
    handleClearKeyword,
  } = useNurse();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (nurse: Record<string, unknown>, columnKey: Key) => {
      const cellValue = nurse[columnKey as keyof typeof nurse];

      switch (columnKey) {
        case "image":
          return (
            <Image
              src={`${cellValue}`}
              alt="nurse image"
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
                  aria-label="detail Perawat"
                  className="flex h-8 w-8 min-w-0 items-center justify-center rounded-md border border-gray-300 p-0 text-slate-400"
                  onPress={() => push(`/owner/detail/${nurse.nurse_id}`)}
                >
                  <FaEye className="text-lg" />
                </Button>
              </Tooltip>

              <Tooltip content="Edit Perawat">
                <Button
                  size="sm"
                  variant="light"
                  aria-label="edit nurse"
                  className="flex h-8 w-8 min-w-0 items-center justify-center rounded-md border border-gray-300 p-0 text-slate-400"
                  onPress={() => console.log(`Edit nurse ${nurse.nurse_id}`)}
                >
                  <FaEdit className="text-lg" />
                </Button>
              </Tooltip>

              <Tooltip content="Hapus Perawat" color="danger">
                <Button
                  size="sm"
                  variant="light"
                  aria-label="hapus nurse"
                  className="flex h-8 w-8 min-w-0 items-center justify-center rounded-md border border-gray-300 p-0 text-red-500"
                  onPress={() =>
                    console.log(`Hapus nurse ${nurse.nurse_id}`)
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
      <h1 className="mb-4 text-2xl font-semibold text-gray-700">Perawat</h1>
      <div className="mb-5 mt-6">
        <Breadcrumbs>
          <BreadcrumbItem>Master Data</BreadcrumbItem>
          <BreadcrumbItem>Perawat</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="min-h-[70vh] rounded-lg bg-white px-5 py-8 shadow">
        <h2 className="mb-3 px-4 text-xl font-semibold text-slate-400">
          Tabel Perawat
        </h2>
        <section>
          {Object.keys(query).length > 0 && (
            <DataTable
              emptyContent="Tidak ada data perawat"
              renderCell={renderCell}
              columns={COLUMN_LISTS_NURSE}
              size={String(currentSize)}
              onClearKeyword={handleClearKeyword}
              onChangeKeyword={handleKeyword}
              onChangeSize={handleChangeSize}
              onChangePage={handleChangePage}
              currentPage={Number(currentPage)}
              totalPage={dataNurse?.total_pages}
              isLoading={isLoadingNurse || isRefetchingNurse}
              buttonTopContent="Tambah Perawat"
              onClickButtonTopContent={() => {}}
              data={dataNurse?.data || []}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default Nurse;
