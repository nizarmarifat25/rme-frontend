import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IPaymentMethod } from "@/types/PaymentMethods";

const paymentMethodServices = {
    getPaymentMethods: (params?: string) => instance.get(`${endpoint.PAYMENT_METHOD}/methods?${params}`),
    postPaymentMethod: (data: IPaymentMethod) => instance.post(`${endpoint.PAYMENT_METHOD}/methods`, data),
    editPaymentMethod: (data: IPaymentMethod, id: string) => instance.put(`${endpoint.PAYMENT_METHOD}/methods/${id}`, data),
    deletePaymentMethod: (id: string) => instance.delete(`${endpoint.PAYMENT_METHOD}/methods/${id}`),
}

export default paymentMethodServices