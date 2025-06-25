import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const transactionServices = {
    getTransactions: (params: string) => instance.get(`${endpoint.TRANSACTION}?${params}`),
}

export default transactionServices