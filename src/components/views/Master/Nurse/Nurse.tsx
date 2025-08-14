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
import { COLUMN_LISTS_NURSE } from "./Nurse.constans";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import useNurse from "./useNurse";
import ActionNurseModal from "./ActionNurseModal";
import DeleteNurseModal from "./DeleteNurseModal";
import HeaderLayout from "@/components/ui/Header/Header";

const Nurse = () => {
  const { push, isReady, query } = useRouter();
  const {
    setURL,
    dataNurse,
    isLoadingNurse,
    currentPage,
    currentSize,
    isRefetchingNurse,
    refetchNurse,
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
              <Tooltip content="Perbaharui Perawat">
                <Button
                  size="sm"
                  variant="light"
                  aria-label="edit nurse"
                  className="flex h-8 w-8 min-w-0 items-center justify-center rounded-md border border-gray-300 p-0 text-slate-400"
                  onPress={() => {
                    setIsModalOpen("edit");
                    setSelectedData(nurse);
                  }}
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
                  onPress={() => {
                    setIsModalOpen("delete");
                    setSelectedId(String(nurse.id));
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
      <HeaderLayout title="Perawat" breadcrumbs={["Master Data", "Perawat"]} />
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
              onClickButtonTopContent={() => setIsModalOpen("add")}
              data={dataNurse?.data || []}
            />
          )}
        </section>
      </div>

      <ActionNurseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen("")}
        refetchNurse={refetchNurse}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />

      <DeleteNurseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen("")}
        refetchNurse={refetchNurse}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  );
};

export default Nurse;
