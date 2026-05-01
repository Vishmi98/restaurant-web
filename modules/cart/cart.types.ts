export type CustomerType = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
};

export type OrderItemType = {
    dishId: number;
    quantity: number;
};

export type OrderType = {
    customer: CustomerType;
    items: OrderItemType[];
    paymentMethod: string;
    note: string;
};

export type OrderItemDataType = {
    dishId: number;
    name: string;
    price: number;
    quantity: number;
    imagePath: string;
};

export type OrderDataType = {
    id: number;
    customer: CustomerType;
    items: OrderItemDataType[];
    totalAmount: number;
    deliveryFee: number;
    paymentMethod: string;
    isPaid: boolean;
    status: string;
    note: string;
    estimatedDeliveryTime: string;
};

export type OrderResponseType = {
    success: boolean;
    message: string;
    data: OrderDataType;
};

export type OrderDataResponseType = {
    success: boolean;
    message: string;
    order: OrderDataType;
};

export type CreateOrderResponseType = {
    success: boolean;
    message: string;
    order: {
        id: number;
    };
};

export type OrdersResponseType = {
    success: boolean;
    message: string;
    data: OrderDataType[];
};

export type OrdersDataResponseType = {
    success: boolean;
    message: string;
    orders: OrderDataType[];
};
