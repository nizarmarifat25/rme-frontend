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
import { COLUMN_LISTS_MEDICINE_CATEGORY } from "./MedicineCategory.constants";
import { FaEdit, FaTrash } from "react-icons/fa";
import useMedicineCategory from "./UseMedicineCategory";
import ActionMedicineCategoryModal from "./ActionMedicineCategoryModal";
import DeleteMedicineCategoryModal from "./DeleteMedicineCategoryModal";
import HeaderLayout from "@/components/ui/Header/Header";

const MedicineCategory = () => {
  const { push, isReady, query } = useRouter();
  const {
    setURL,
    dataMedicineCategory,
    isLoadingMedicineCategory,
    currentPage,
    currentSize,
    isRefetchingMedicineCategory,
    refetchMedicineCategory,
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
  } = useMedicineCategory();

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
            <div className="flex justify-center space-x-1">
              <Tooltip content="Perbaharui Kategori Obat">
                <Button
                  size="sm"
                  variant="light"
                  aria-label="edit Kategori Obat"
                  className="flex h-8 w-8 min-w-0 items-center justify-center rounded-md border border-gray-300 p-0 text-slate-400"
                  onPress={() => {
                    setIsModalOpen("edit");
                    setSelectedData(medicine);
                  }}
                >
                  <FaEdit className="text-lg" />
                </Button>
              </Tooltip>

              <Tooltip content="Hapus Kategori Obat" color="danger">
                <Button
                  size="sm"
                  variant="light"
                  aria-label="hapus Kategori Obat"
                  className="flex h-8 w-8 min-w-0 items-center justify-center rounded-md border border-gray-300 p-0 text-red-500"
                  onPress={() => {
                    setIsModalOpen("delete");
                    setSelectedId(String(medicine.medicine_category_id));
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
      <HeaderLayout
        title="Kategori Obat"
        breadcrumbs={["Master Data", "Kategori Obat"]}
      />
      <div className="min-h-[70vh] rounded-lg bg-white px-5 py-8 shadow">
        <h2 className="mb-3 px-4 text-xl font-semibold text-slate-400">
          Tabel Kategori Obat
        </h2>
        <section>
          {Object.keys(query).length > 0 && (
            <DataTable
              emptyContent="Tidak ada data Kategori Obat"
              renderCell={renderCell}
              columns={COLUMN_LISTS_MEDICINE_CATEGORY}
              size={String(currentSize)}
              onClearKeyword={handleClearKeyword}
              onChangeKeyword={handleKeyword}
              onChangeSize={handleChangeSize}
              onChangePage={handleChangePage}
              currentPage={Number(currentPage)}
              totalPage={dataMedicineCategory?.total_pages}
              isLoading={
                isLoadingMedicineCategory || isRefetchingMedicineCategory
              }
              buttonTopContent="Tambah Kategori Obat"
              onClickButtonTopContent={() => setIsModalOpen("add")}
              data={dataMedicineCategory?.data || []}
            />
          )}
        </section>
      </div>

      <ActionMedicineCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen("")}
        refetchMedicineCategory={refetchMedicineCategory}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />

      <DeleteMedicineCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen("")}
        refetchMedicineCategory={refetchMedicineCategory}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  );
};

export default MedicineCategory;
