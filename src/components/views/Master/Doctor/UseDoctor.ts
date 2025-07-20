import { DELAY, PAGE_DEFAULT, SIZE_DEFAULT, } from "@/constants/list.constants"
import useDebounce from "@/hooks/useDebounce"
import doctorServices from "@/services/doctor.service"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"

const useDoctor = () => {

    const [isModalOpen, setIsModalOpen] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const [selectedData, setSelectedData] = useState({})


    const router = useRouter()
    const debounce = useDebounce()

    const currentSize = router.query.size
    const currentPage = router.query.page
    const currentKeyword = router.query.keyword

    const setURL = () => {
        router.replace({
            query: {
                size: currentSize || SIZE_DEFAULT,
                page: currentPage || PAGE_DEFAULT,
                keyword: currentKeyword || ""
            }
        })
    }


    const getDoctors = async () => {
        let pagination = true

        let params = `pagination=${pagination}&limit=${currentSize}&page=${currentPage}`
        if (currentKeyword) {
            params += `&search=${currentKeyword}`
        }
        const res = await doctorServices.getDoctors(params);
        const { data } = res;

        return data
    }

    const {
        data: dataDoctor,
        isLoading: isLoadingDoctor,
        isRefetching: isRefetchingDoctor,
        refetch: refetchDoctor
    } = useQuery({
        queryKey: ["Doctor", currentPage, currentSize, currentKeyword],
        queryFn: getDoctors,
        enabled: router.isReady && !!currentPage && !!currentSize
    })

    const handleChangePage = (page: number) => {
        router.push({
            query: {
                ...router.query,
                page
            }

        })
    }

    const handleChangeSize = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedSize = e.target.value

        router.push({
            query: {
                ...router.query,
                size: selectedSize,
                page: PAGE_DEFAULT
            }
        })
    }

    const handleKeyword = (e: ChangeEvent<HTMLInputElement>) => {
        debounce(() => {
            const keyword = e.target.value;
            router.push({
                query: {
                    ...router.query,
                    keyword,
                    page: PAGE_DEFAULT
                }
            })
        }, DELAY)
    }

    const handleClearKeyword = () => {
        router.push({
            query: {
                ...router.query,
                keyword: "",
                page: PAGE_DEFAULT
            }
        })
    }



    return {
        dataDoctor,
        isLoadingDoctor,
        currentPage,
        currentSize,
        isRefetchingDoctor,
        setURL,
        handleChangePage,
        handleChangeSize, handleKeyword,
        handleClearKeyword,
        refetchDoctor,

        isModalOpen,
        setIsModalOpen,

        selectedId,
        setSelectedId,

        selectedData,
        setSelectedData
    }

}

export default useDoctor

