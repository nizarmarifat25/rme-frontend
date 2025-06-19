import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const paymentMethodServices = {
    getPaymentMethods: () => instance.get(`${endpoint.PAYMENT_METHOD}/method`),
}

export default paymentMethodServices