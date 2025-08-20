import { DELAY, PAGE_DEFAULT, SIZE_DEFAULT } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import paymentMethodServices from "@/services/payment_method.service"; 
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const usePaymentMethod = () => {
    const [isModalOpen, setIsModalOpen] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const [selectedData, setSelectedData] = useState({});

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

    const getPaymentMethods = async () => {
        try {
            let params = `size=${currentSize}&page=${currentPage}`;
            if (currentKeyword) {
                params += `&search=${currentKeyword}`;
            }

            const res = await paymentMethodServices.getPaymentMethods(params);
            const { data } = res;
            return data;
        } catch (error) {
            console.error("Error fetching payment methods:", error);

            return { error: true, message: "Gagal mengambil data payment method." };
        }
    };

    const {
        data: dataPaymentMethod,
        isLoading: isLoadingPaymentMethod,
        isRefetching: isRefetchingPaymentMethod,
        refetch: refetchPaymentMethod
    } = useQuery({
        queryKey: ["PaymentMethod", currentPage, currentSize, currentKeyword],
        queryFn: getPaymentMethods,
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
        dataPaymentMethod,
        isLoadingPaymentMethod,
        currentPage,
        currentSize,
        currentKeyword,
        isRefetchingPaymentMethod,
        setURL,
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
        setSelectedData
    };
};

export default usePaymentMethod;
