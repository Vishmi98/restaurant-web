import { CreateOrderResponseType, OrderDataResponseType, OrderResponseType, OrdersDataResponseType, OrdersResponseType, OrderType } from "./cart.types";

import { URL } from "@/constants/config";
import apiCall from "@/services/api.services";


export const createOrder = async (
    body: OrderType
): Promise<CreateOrderResponseType> => {
    const response: OrderResponseType = await apiCall({
        url: `${URL}/order/create`,
        method: "POST",
        body,
    });

    return {
        success: response.success,
        message: response.message,
        order: {
            id: response.data.id, // 👈 MUST come from backend
        },
    };
};

export const getOrderById = async (props: {
    id: number;
}): Promise<OrderDataResponseType> => {
    const { id } = props;

    const response: OrderResponseType = await apiCall({
        url: `${URL}/order/get-one`,
        method: "POST",
        body: { id },
    });

    return {
        success: response.success,
        message: response.message,
        order: response.data,
    };
};

export const getOrderByUserId = async (props: {
    customerId: number;
}): Promise<OrdersDataResponseType> => {
    const { customerId } = props;

    const response: OrdersResponseType = await apiCall({
        url: `${URL}/order/get-by-userId`,
        method: "POST",
        body: { customerId },
    });

    return {
        success: response.success,
        message: response.message,
        orders: response.data,
    };
};