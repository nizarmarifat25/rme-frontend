import DataTable from "@/components/ui/DataTable";
import { Breadcrumbs, BreadcrumbItem, Button } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_MEDICAL_RECORDS } from "./MedicalRecord.constants";
import useMedicalRecord from "./UseMedicalRecord";
import { useSession } from "next-auth/react";

const MedicalRecord = () => {
  const { push, isReady, query } = useRouter();
  const {
    setURL,
    dataMedicalRecord,
    isLoadingMedicalRecord,
    currentPage,
    currentSize,
    isRefetchingMedicalRecord,
    handleChangePage,
    handleChangeSize,
    handleKeyword,
    handleClearKeyword,
    setIsModalOpen,
    setSelectedData,
  } = useMedicalRecord();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const { data: session } = useSession();

  const renderCell = useCallback(
    (medicalRecord: Record<string, unknown>, columnKey: Key) => {
      const cellValue = medicalRecord[columnKey as keyof typeof medicalRecord];

      switch (columnKey) {
        case "actions":
          return (
            <div className="flex justify-center space-x-1">
              {medicalRecord.latest_status === "scheduled" &&
                session?.user?.role == "doctor" && (
                  <Button
                    size="sm"
                    variant="solid"
                    color="primary"
                    className="text-white"
                    aria-label="edit medical record"
                    onPress={() => {
                      setIsModalOpen("update-result");
                      setSelectedData(medicalRecord);
                    }}
                  >
                    Perbaharui Hasil Kunjungan
                  </Button>
                )}
              {medicalRecord.latest_status === "scheduled" &&
                session?.user?.role == "admin" && (
                  <>
                    <Button
                      size="sm"
                      variant="solid"
                      color="primary"
                      aria-label="edit medical record"
                      onPress={() => {
                        setIsModalOpen("update-status");
                        setSelectedData(medicalRecord);
                      }}
                    >
                      Perbaharui Status Kunjungan
                    </Button>
                  </>
                )}
              {medicalRecord.latest_status === "pending_payment" &&
                session?.user?.role == "admin" && (
                  <>
                    <Button
                      size="sm"
                      variant="solid"
                      color="success"
                      aria-label="edit medical record"
                      className="text-white"
                      onPress={() => {
                        setIsModalOpen("close");
                        setSelectedData(medicalRecord);
                      }}
                    >
                      Selesaikan Kunjungan
                    </Button>
                  </>
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
      <h1 className="mb-4 text-2xl font-semibold text-gray-700">
        Rekam Medis Pasien
      </h1>
      <div className="mb-5 mt-6">
        <Breadcrumbs>
          <BreadcrumbItem>Rekam Medis Pasien</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="min-h-[70vh] rounded-lg bg-white px-5 py-8 shadow">
        <h2 className="mb-3 px-4 text-xl font-semibold text-slate-400">
          Tabel Rekam Medis Pasien
        </h2>
        <section>
          {Object.keys(query).length > 0 && (
            <DataTable
              emptyContent="Tidak ada data rekam medis"
              renderCell={renderCell}
              columns={COLUMN_LISTS_MEDICAL_RECORDS}
              size={String(currentSize)}
              onClearKeyword={handleClearKeyword}
              onChangeKeyword={handleKeyword}
              onChangeSize={handleChangeSize}
              onChangePage={handleChangePage}
              currentPage={Number(currentPage)}
              totalPage={dataMedicalRecord?.total_pages}
              isLoading={isLoadingMedicalRecord || isRefetchingMedicalRecord}
              buttonTopContent=""
              onClickButtonTopContent={() => {}}
              data={dataMedicalRecord?.data || []}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default MedicalRecord;
