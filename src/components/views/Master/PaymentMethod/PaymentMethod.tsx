import DataTable from "@/components/ui/DataTable";
import { Breadcrumbs, BreadcrumbItem, Button, Tooltip } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect, useState } from "react";
import { COLUMN_LISTS_PAYMENT_METHOD } from "./PaymentMethod.constants";
import { FaEdit, FaTrash } from "react-icons/fa";
import UsePaymentMethod from "./usePaymentMethod";
import { formatRupiah } from "@/utils/currency-format";
import ActionPaymentMethodModal from "./ActionPaymentMethodModal";
import DeletePaymentMethodModal from "./DeletePaymentMethodModal";
import HeaderLayout from "@/components/ui/Header/Header";

const PaymentMethod = () => {
  const { push, isReady, query } = useRouter();
  const {
    setURL,
    dataPaymentMethod,
    isLoadingPaymentMethod,
    currentPage,
    currentSize,
    currentKeyword,
    isRefetchingPaymentMethod,
    refetchPaymentMethod,
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
  } = UsePaymentMethod();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (paymentMethod: Record<string, unknown>, columnKey: Key) => {
      const cellValue = paymentMethod[columnKey as keyof typeof paymentMethod];

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
              <Tooltip content="Perbaharui Metode Pembayaran">
                <Button
                  size="sm"
                  variant="light"
                  aria-label="edit payment method"
                  className="flex h-8 w-8 min-w-0 items-center justify-center rounded-md border border-gray-300 p-0 text-slate-400"
                  onPress={() => {
                    setIsModalOpen("edit");
                    setSelectedData(paymentMethod);
                  }}
                >
                  <FaEdit className="text-lg" />
                </Button>
              </Tooltip>

              <Tooltip content="Hapus Metode Pembayaran" color="danger">
                <Button
                  size="sm"
                  variant="light"
                  aria-label="hapus payment method"
                  className="flex h-8 w-8 min-w-0 items-center justify-center rounded-md border border-gray-300 p-0 text-red-500"
                  onPress={() => {
                    setIsModalOpen("delete");
                    setSelectedId(String(paymentMethod.id));
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
      <HeaderLayout title="Metode Pembayaran" breadcrumbs={["Master Data", "Metode Pembayaran"]} />
      <div className="min-h-[70vh] rounded-lg bg-white px-5 py-8 shadow">
        <h2 className="mb-3 px-4 text-xl font-semibold text-slate-400">
          Tabel Metode Pembayaran
        </h2>
        <section>
          {Object.keys(query).length > 0 && (
            <DataTable
              emptyContent="Tidak ada data metode pembayaran"
              renderCell={renderCell}
              columns={COLUMN_LISTS_PAYMENT_METHOD}
              size={String(currentSize)}
              onClearKeyword={handleClearKeyword}
              onChangeKeyword={handleKeyword}
              onChangeSize={handleChangeSize}
              onChangePage={handleChangePage}
              currentKeyword={String(currentKeyword)}
              currentPage={Number(currentPage)}
              totalPage={dataPaymentMethod?.total_pages}
              isLoading={isLoadingPaymentMethod || isRefetchingPaymentMethod}
              buttonTopContent="Tambah Payment Method"
              onClickButtonTopContent={() => setIsModalOpen("add")}
              data={dataPaymentMethod?.data || []}
            />
          )}
        </section>
      </div>

      <ActionPaymentMethodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen("")}
        refetchPaymentMethod={refetchPaymentMethod}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />

      <DeletePaymentMethodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen("")}
        refetchPaymentMethod={refetchPaymentMethod}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  );
};

export default PaymentMethod;
