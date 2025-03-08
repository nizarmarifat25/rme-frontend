import DataTable from "@/components/ui/DataTable";
import { Breadcrumbs, BreadcrumbItem, Button, Tooltip } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect, useState } from "react";
import { COLUMN_LISTS_TREATMENT } from "./Treatment.constants";
import { FaEdit, FaTrash } from "react-icons/fa";
import UseTreatment from "./UseTreatment";
import { formatRupiah } from "@/utils/currency-format";
import ActionTreatmentModal from "./ActionTreatmentModal";
import DeleteTreatmentModal from "./DeleteTreatmentModal";

const Treatment = () => {
  const { push, isReady, query } = useRouter();
  const {
    setURL,
    dataTreatment,
    isLoadingTreatment,
    currentPage,
    currentSize,
    isRefetchingTreatment,
    refetchTreatment,
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
  } = UseTreatment();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (treatment: Record<string, unknown>, columnKey: Key) => {
      const cellValue = treatment[columnKey as keyof typeof treatment];

      switch (columnKey) {
        case "price":
          return (
            <p className="font-semibold text-green-500">
              {formatRupiah(Number(cellValue))}
            </p>
          );

        case "actions":
          return (
            <div className="flex justify-center space-x-1">
              <Tooltip content="Perbaharui Tindakan">
                <Button
                  size="sm"
                  variant="light"
                  aria-label="edit treatment"
                  className="flex h-8 w-8 min-w-0 items-center justify-center rounded-md border border-gray-300 p-0 text-slate-400"
                  onPress={() => {
                    setIsModalOpen("edit");
                    setSelectedData(treatment);
                  }}
                >
                  <FaEdit className="text-lg" />
                </Button>
              </Tooltip>

              <Tooltip content="Hapus Tindakan" color="danger">
                <Button
                  size="sm"
                  variant="light"
                  aria-label="hapus treatment"
                  className="flex h-8 w-8 min-w-0 items-center justify-center rounded-md border border-gray-300 p-0 text-red-500"
                  onPress={() => {
                    setIsModalOpen("delete");
                    setSelectedId(String(treatment.treatment_id));
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
      <h1 className="mb-4 text-2xl font-semibold text-gray-700">Treatment</h1>
      <div className="mb-5 mt-6">
        <Breadcrumbs>
          <BreadcrumbItem>Master Data</BreadcrumbItem>
          <BreadcrumbItem>Treatment</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="min-h-[70vh] rounded-lg bg-white px-5 py-8 shadow">
        <h2 className="mb-3 px-4 text-xl font-semibold text-slate-400">
          Tabel Treatment
        </h2>
        <section>
          {Object.keys(query).length > 0 && (
            <DataTable
              emptyContent="Tidak ada data treatment"
              renderCell={renderCell}
              columns={COLUMN_LISTS_TREATMENT}
              size={String(currentSize)}
              onClearKeyword={handleClearKeyword}
              onChangeKeyword={handleKeyword}
              onChangeSize={handleChangeSize}
              onChangePage={handleChangePage}
              currentPage={Number(currentPage)}
              totalPage={dataTreatment?.total_pages}
              isLoading={isLoadingTreatment || isRefetchingTreatment}
              buttonTopContent="Tambah Treatment"
              onClickButtonTopContent={() => setIsModalOpen("add")}
              data={dataTreatment?.data || []}
            />
          )}
        </section>
      </div>

      <ActionTreatmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen("")}
        refetchTreatment={refetchTreatment}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />

      <DeleteTreatmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen("")}
        refetchTreatment={refetchTreatment}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  );
};

export default Treatment;
