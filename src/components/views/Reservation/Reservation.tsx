import DataTable from "@/components/ui/DataTable";
import { Breadcrumbs, BreadcrumbItem, Button, Tooltip } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_RESERVATIONS } from "./Reservation.constants";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import useReservation from "./useReservation";
import AddReservationModal from "./AddReservationModal/AddReservationModal";
import UpdateResultReservationModal from "./UpdateResultReservationModal";
import { useSession } from "next-auth/react";
import UpdateStatusReservationModal from "./UpdateStatusReservationModal";
import CloseReservationModal from "./CloseReservationModal";

const Reservation = () => {
  const { push, isReady, query } = useRouter();
  const {
    setURL,
    dataReservation,
    isLoadingReservation,
    currentPage,
    currentSize,
    isRefetchingReservation,
    refetchReservation,
    handleChangePage,
    handleChangeSize,
    handleKeyword,
    handleClearKeyword,
    isModalOpen,
    setIsModalOpen,
    selectedData,
    setSelectedData,
  } = useReservation();

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  const { data: session } = useSession();

  const renderCell = useCallback(
    (reservation: Record<string, unknown>, columnKey: Key) => {
      const cellValue = reservation[columnKey as keyof typeof reservation];

      switch (columnKey) {
        case "actions":
          return (
            <div className="flex justify-center space-x-1">
              {reservation.latest_status === "scheduled" &&
                session?.user?.role == "doctor" && (
                  <Button
                    size="sm"
                    variant="solid"
                    color="primary"
                    className="text-white"
                    aria-label="edit reservation"
                    onPress={() => {
                      setIsModalOpen("update-result");
                      setSelectedData(reservation);
                    }}
                  >
                    Perbaharui Hasil Kunjungan
                  </Button>
                )}
              {reservation.latest_status === "scheduled" &&
                session?.user?.role == "admin" && (
                  <>
                    <Button
                      size="sm"
                      variant="bordered"
                      color="primary"
                      aria-label="edit reservation"
                      onPress={() => {
                        setIsModalOpen("update-status");
                        setSelectedData(reservation);
                      }}
                    >
                      Perbaharui Status Kunjungan
                    </Button>
                  </>
                )}
              {reservation.latest_status === "pending_payment" &&
                session?.user?.role == "admin" && (
                  <>
                    <Button
                      size="sm"
                      variant="bordered"
                      color="success"
                      aria-label="edit reservation"
                      onPress={() => {
                        setIsModalOpen("close");
                        setSelectedData(reservation);
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
        Kunjungan Pasien
      </h1>
      <div className="mb-5 mt-6">
        <Breadcrumbs>
          <BreadcrumbItem>Kunjungan Pasien</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="min-h-[70vh] rounded-lg bg-white px-5 py-8 shadow">
        <h2 className="mb-3 px-4 text-xl font-semibold text-slate-400">
          Tabel Kunjungan Pasien
        </h2>
        <section>
          {Object.keys(query).length > 0 && (
            <DataTable
              emptyContent="Tidak ada data reservasi"
              renderCell={renderCell}
              columns={COLUMN_LISTS_RESERVATIONS}
              size={String(currentSize)}
              onClearKeyword={handleClearKeyword}
              onChangeKeyword={handleKeyword}
              onChangeSize={handleChangeSize}
              onChangePage={handleChangePage}
              currentPage={Number(currentPage)}
              totalPage={dataReservation?.total_pages}
              isLoading={isLoadingReservation || isRefetchingReservation}
              buttonTopContent="Tambah Kunjungan Pasien"
              onClickButtonTopContent={() => setIsModalOpen("add")}
              data={dataReservation?.data || []}
            />
          )}
        </section>
      </div>

      <AddReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen("")}
        refetchReservation={refetchReservation}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />

      <UpdateResultReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen("")}
        refetchReservation={refetchReservation}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />

      <UpdateStatusReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen("")}
        refetchReservation={refetchReservation}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />

      <CloseReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen("")}
        refetchReservation={refetchReservation}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />
    </div>
  );
};

export default Reservation;
