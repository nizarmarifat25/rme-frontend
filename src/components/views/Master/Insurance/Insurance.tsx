import DataTable from "@/components/ui/DataTable";
import { Breadcrumbs, BreadcrumbItem, Button, Tooltip } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect, useState } from "react";
import { COLUMN_LISTS_INSURANCE } from "./Insurance.constants";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import useInsurance from "./UseInsurance";
import { formatRupiah } from "@/utils/currency-format";
import ActionInsuranceModal from "./ActionInsuranceModal";
import DeleteInsuranceModal from "./DeleteInsuranceModal";
import HeaderLayout from "@/components/ui/Header/Header";

const Insurance = () => {
  const { push, isReady, query } = useRouter();
  const {
    setURL,
    dataInsurance,
    isLoadingInsurance,
    currentPage,
    currentSize,
    currentKeyword,
    isRefetchingInsurance,
    refetchInsurance,
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
  } = useInsurance();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (insurance: Record<string, unknown>, columnKey: Key) => {
      const cellValue = insurance[columnKey as keyof typeof insurance];

      switch (columnKey) {
        case "premium":
          return (
            <p className="font-semibold text-green-500">
              {formatRupiah(Number(cellValue))}
            </p>
          );

        case "actions":
          return (
            <div className="flex justify-center space-x-1">
              <Tooltip content="Perbaharui Asuransi">
                <Button
                  size="sm"
                  variant="light"
                  aria-label="edit insurance"
                  className="flex h-8 w-8 min-w-0 items-center justify-center rounded-md border border-gray-300 p-0 text-slate-400"
                  onPress={() => {
                    setIsModalOpen("edit");
                    setSelectedData(insurance);
                  }}
                >
                  <FaEdit className="text-lg" />
                </Button>
              </Tooltip>

              <Tooltip content="Hapus Asuransi" color="danger">
                <Button
                  size="sm"
                  variant="light"
                  aria-label="hapus insurance"
                  className="flex h-8 w-8 min-w-0 items-center justify-center rounded-md border border-gray-300 p-0 text-red-500"
                  onPress={() => {
                    setIsModalOpen("delete");
                    setSelectedId(String(insurance.id));
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
      <HeaderLayout title="Asuransi" breadcrumbs={["Master Data", "Asuransi"]} />
      <div className="min-h-[70vh] rounded-lg bg-white px-5 py-8 shadow">
        <h2 className="mb-3 px-4 text-xl font-semibold text-slate-400">
          Tabel Asuransi
        </h2>
        <section>
          {Object.keys(query).length > 0 && (
            <DataTable
              emptyContent="Tidak ada data asuransi"
              renderCell={renderCell}
              columns={COLUMN_LISTS_INSURANCE}
              size={String(currentSize)}
              onClearKeyword={handleClearKeyword}
              onChangeKeyword={handleKeyword}
              onChangeSize={handleChangeSize}
              onChangePage={handleChangePage}
              currentPage={Number(currentPage)}
              currentKeyword={String(currentKeyword)}
              totalPage={dataInsurance?.total_pages}
              isLoading={isLoadingInsurance || isRefetchingInsurance}
              buttonTopContent="Tambah Asuransi"
              onClickButtonTopContent={() => setIsModalOpen("add")}
              data={dataInsurance?.data || []}
            />
          )}
        </section>
      </div>

      <ActionInsuranceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen("")}
        refetchInsurance={refetchInsurance}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />

      <DeleteInsuranceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen("")}
        refetchInsurance={refetchInsurance}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  );
};

export default Insurance;
