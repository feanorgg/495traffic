import { Product } from "./Product";

export type Order = {
    _id: string;
    products: Array<Product>;
    raw_total: number;
    promo_code: string;
    discount: number;
    total: number;
    currency: "RUB" | "USD";

    email: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    user_id: string;

    delivery_cost: number;
    delivery_type: "cdek"; // | "pickup" | "courier_moscow";
    delivery_address: string;

    is_paid: boolean;
    status: string;
    expect_payment: boolean;
    payment_url: string;

    payment_provider?: string;

    created_at: string;
    updated_at: string;
};
