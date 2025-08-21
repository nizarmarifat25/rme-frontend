import { DELAY, PAGE_DEFAULT, SIZE_DEFAULT } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import reservationServices from "@/services/reservation.service"; 
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const useReservation = () => {

    const [isModalOpen, setIsModalOpen] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const [selectedData, setSelectedData] = useState({})
    const router = useRouter();
    const debounce = useDebounce();

    const currentSize = router.query.size;
    const currentPage = router.query.page;
    const currentKeyword = router.query.keyword;

    const setURL = () => {
        router.replace({
            query: {
                size: currentSize || SIZE_DEFAULT,
                page: currentPage || PAGE_DEFAULT,
                keyword: currentKeyword || ""
            }
        });
    };

    const getReservations = async () => {
        let params = `size=${currentSize}&page=${currentPage}`;
        if (currentKeyword) {
            params += `&keyword=${currentKeyword}`;
        }
        const res = await reservationServices.getReservations(params);
        const { data } = res;
        return data;
    };

    const {
        data: dataReservation,
        isLoading: isLoadingReservation,
        isRefetching: isRefetchingReservation,
        refetch: refetchReservation
    } = useQuery({
        queryKey: ["Reservation", currentPage, currentSize, currentKeyword],
        queryFn: getReservations,
        enabled: router.isReady && !!currentPage && !!currentSize
    });

    const handleChangePage = (page: number) => {
        router.push({
            query: {
                ...router.query,
                page
            }
        });
    };

    const handleChangeSize = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedSize = e.target.value;
        router.push({
            query: {
                ...router.query,
                size: selectedSize,
                page: PAGE_DEFAULT
            }
        });
    };

    const handleKeyword = (e: ChangeEvent<HTMLInputElement>) => {
        debounce(() => {
            const keyword = e.target.value;
            router.push({
                query: {
                    ...router.query,
                    keyword,
                    page: PAGE_DEFAULT
                }
            });
        }, DELAY);
    };

    const handleClearKeyword = () => {
        router.push({
            query: {
                ...router.query,
                keyword: "",
                page: PAGE_DEFAULT
            }
        });
    };

    return {
        dataReservation,
        isLoadingReservation,
        currentPage,
        currentSize,
        currentKeyword,
        isRefetchingReservation,
        refetchReservation,
        setURL,
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
    };
};

export default useReservation;
