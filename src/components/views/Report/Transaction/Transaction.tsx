import DataTable from "@/components/ui/DataTable";
import { Breadcrumbs, BreadcrumbItem, Button, Chip } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_TRANSACTION } from "./Transaction.constants";
import useTransaction from "./UseTransaction";
import { useSession } from "next-auth/react";
import HeaderLayout from "@/components/ui/Header/Header";

const Transaction = () => {
  const { push, isReady, query } = useRouter();
  const {
    setURL,
    dataTransaction,
    isLoadingTransaction,
    currentPage,
    currentSize,
    isRefetchingTransaction,
    handleChangePage,
    handleChangeSize,
    handleKeyword,
    handleClearKeyword,
    setIsModalOpen,
    setSelectedData,
  } = useTransaction();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const { data: session } = useSession();

  const renderCell = useCallback(
    (transaction: Record<string, unknown>, columnKey: Key) => {
      const cellValue = transaction[columnKey as keyof typeof transaction];
      const getStatusColor = (status: string) => {
        switch (status) {
          case "scheduled":
            return "warning";
          case "pending_payment":
            return "danger";
          case "closed":
            return "success";
          default:
            return "primary";
        }
      };

      switch (columnKey) {
        case "payment_status":
          return (
            <Chip
              radius="sm"
              size="sm"
              className={
                transaction.payment_status === "pending"
                  ? "bg-yellow-400 font-semibold text-yellow-700"
                  : transaction.payment_status === "lunas"
                    ? "bg-green-500 font-semibold text-white"
                    : "bg-slate-300 font-semibold text-slate-800"
              }
              variant="flat"
            >
              {cellValue as string}
            </Chip>
          );

        case "actions":
          return (
            <div className="flex justify-center space-x-1">
              {transaction.payment_status === "pending" &&
                session?.user?.role == "admin" && (
                  <Button
                    size="sm"
                    variant="solid"
                    color="success"
                    className="text-white"
                    aria-label="close transaction"
                    onPress={() => {
                      setIsModalOpen("close");
                      setSelectedData(transaction);
                    }}
                  >
                    Selesaikan Transaksi
                  </Button>
                )}
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
        title="Transaksi"
        breadcrumbs={["Laporan", "Transaksi"]}
      />
      <div className="min-h-[70vh] rounded-lg bg-white px-5 py-8 shadow">
        <h2 className="mb-3 px-4 text-xl font-semibold text-slate-400">
          Tabel Transaksi
        </h2>
        <section>
          {Object.keys(query).length > 0 && (
            <DataTable
              emptyContent="Tidak ada data transaksi"
              renderCell={renderCell}
              columns={COLUMN_LISTS_TRANSACTION}
              size={String(currentSize)}
              onClearKeyword={handleClearKeyword}
              onChangeKeyword={handleKeyword}
              onChangeSize={handleChangeSize}
              onChangePage={handleChangePage}
              currentPage={Number(currentPage)}
              totalPage={dataTransaction?.total_pages}
              isLoading={isLoadingTransaction || isRefetchingTransaction}
              buttonTopContent=""
              onClickButtonTopContent={() => {}}
              data={dataTransaction?.data || []}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default Transaction;
