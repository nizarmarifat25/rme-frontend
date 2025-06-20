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
import { COLUMN_LISTS_MEDICINE_UNIT } from "./MedicineUnit.constants";
import { FaEdit, FaTrash } from "react-icons/fa";
import useMedicineUnit from "./UseMedicineUnit";
import ActionMedicineUnitModal from "./ActionMedicineUnitModal";
import DeleteMedicineUnitModal from "./DeleteMedicineUnitModal";
import HeaderLayout from "@/components/ui/Header/Header";

const MedicineUnit = () => {
  const { push, isReady, query } = useRouter();
  const {
    setURL,
    dataMedicineUnit,
    isLoadingMedicineUnit,
    currentPage,
    currentSize,
    isRefetchingMedicineUnit,
    refetchMedicineUnit,
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
  } = useMedicineUnit();

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
              <Tooltip content="Perbaharui satuan obat">
                <Button
                  size="sm"
                  variant="light"
                  aria-label="edit Satuan Obat"
                  className="flex h-8 w-8 min-w-0 items-center justify-center rounded-md border border-gray-300 p-0 text-slate-400"
                  onPress={() => {
                    setIsModalOpen("edit");
                    setSelectedData(medicine);
                  }}
                >
                  <FaEdit className="text-lg" />
                </Button>
              </Tooltip>

              <Tooltip content="Hapus Satuan Obat" color="danger">
                <Button
                  size="sm"
                  variant="light"
                  aria-label="hapus Satuan Obat"
                  className="flex h-8 w-8 min-w-0 items-center justify-center rounded-md border border-gray-300 p-0 text-red-500"
                  onPress={() => {
                    setIsModalOpen("delete");
                    setSelectedId(String(medicine.medicine_unit_id));
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
        title="Satuan Obat"
        breadcrumbs={["Master Data", "Satuan Obat"]}
      />
      <div className="min-h-[70vh] rounded-lg bg-white px-5 py-8 shadow">
        <h2 className="mb-3 px-4 text-xl font-semibold text-slate-400">
          Tabel Satuan Obat
        </h2>
        <section>
          {Object.keys(query).length > 0 && (
            <DataTable
              emptyContent="Tidak ada data Satuan Obat"
              renderCell={renderCell}
              columns={COLUMN_LISTS_MEDICINE_UNIT}
              size={String(currentSize)}
              onClearKeyword={handleClearKeyword}
              onChangeKeyword={handleKeyword}
              onChangeSize={handleChangeSize}
              onChangePage={handleChangePage}
              currentPage={Number(currentPage)}
              totalPage={dataMedicineUnit?.total_pages}
              isLoading={isLoadingMedicineUnit || isRefetchingMedicineUnit}
              buttonTopContent="Tambah Unit Obat"
              onClickButtonTopContent={() => setIsModalOpen("add")}
              data={dataMedicineUnit?.data || []}
            />
          )}
        </section>
      </div>

      <ActionMedicineUnitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen("")}
        refetchMedicineUnit={refetchMedicineUnit}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />

      <DeleteMedicineUnitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen("")}
        refetchMedicineUnit={refetchMedicineUnit}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  );
};

export default MedicineUnit;
