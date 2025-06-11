export type Product = {
    _id: string;
    alias: string;
    name: string;
    brand: Array<Brand>;
    availability: Array<StockUnit>;
    composition: Array<CompositionUnit>;
    condition: string;
    other_data: object;
    description: string;
    categories: Array<Category>;
    created_at: string;
    images: Array<ProductImage>;
    disabled_for_sale_online: boolean;
    on_remote_stock: boolean;
    measurements: Array<MeasurementItem>;
};

export type MeasurementItem = {
    size: string;
    values: Array<{
        title: string;
        value: string;
    }>;
};

type Brand = {
    id: string;
    name: string;
};

type StockUnit = {
    size: string;
    amount: number;
    prices: Array<Price>;
};

type Price = {
    currency: string;
    value: number;
    newValue: number;
};

type CompositionUnit = {
    alias: string;
    value: string;
};

type Category = {
    name: string;
    id: string;
};

type ProductImage = {
    id: string;
    min: string;
    max: string;
};
