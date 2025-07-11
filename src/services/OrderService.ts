import { Order } from "@/types/Order";
import { Product } from "@/types/Product";
import axios from "axios";

const API_URL = "https://api.495traffic.com/api";
axios.defaults.headers.common['Shop-Id'] = '495TRA';

export default class OrderService {
    static async getCartItems({
        cart,
        promoCode=""
    }: {
        cart: Array<{ id: string, size: string }>,
        promoCode?: string
    }) {
        const res = await axios.post(
            `${API_URL}/cart-items`,
            { cart: cart, promo_code: promoCode },
        );

        return res.data;
    }

    static async checkPromoCode({
        cart,
        promoCode=""
    }: {
        cart: Array<{ id: string, size: string }>,
        promoCode?: string
    }) {
        const res = await axios.post(
            `${API_URL}/check-promo`,
            { cart: cart, promo_code: promoCode },
        );

        const data: {
            cart: Array<Product>,
            promo_code: {
                success: boolean,
                msg: string
            }
        } = res.data;

        return data;
    }

    static async getCitySuggestions(name: string) {
        const res = await axios.get(
            `${API_URL}/shops/delivery/suggest-city?name=${name}`
        );

        return res.data;
    }

    static async getDeliveryCost(code: number, cart_price: number) {
        const res = await axios.post(
            `${API_URL}/shops/delivery/calculate-shipping`,
            {
                "to_location_code": code,
                "cart_price": cart_price
            }
        );

        return res.data;
    }
    
    static async getShippingPoints(city_code: number) {
        const res = await axios.get(
            `${API_URL}/shops/delivery/get-office-list?city_code=${city_code}`
        );

        return res.data;
    }

    static createOrder({
        products,
        email,
        first_name,
        last_name,
        promo_code="",
        currency="RUB",
        phone_number,
        user_id="",
        delivery_type,
        cdek_data,
        delivery_address="",
        payment_method="cash",
        subscribe=false,
        _callback,
        _onStockError=()=>{}
    }: {
        products: Array<Product>,
        email: string,
        first_name: string,
        last_name: string,
        promo_code?: string,
        currency?: "USD" | "RUB",
        phone_number: string,
        user_id?: string,
        delivery_type: "cdek" | "courier",
        cdek_data: {
            shipping_point_code: string,
            city_code: number,
            address: string,
            zip: string
        },
        delivery_address?: string,
        payment_method?: string,
        subscribe?: boolean,
        _callback: (o: Order) => void,
        _onStockError?: () => void
    }) {
        axios.post(
            `${API_URL}/orders/create`,
            {order:{
                products: products,
                email: email,
                first_name: first_name,
                last_name: last_name,
                promo_code: promo_code,
                currency: currency,
                phone_number: phone_number,
                user_id: user_id,
                delivery_type: delivery_type,
                delivery_address: delivery_address,
                payment_method: payment_method,
                subscribe: subscribe,
                cdek_data: {
                    shipping_point_code: cdek_data.shipping_point_code,
                    city_code: cdek_data.city_code,
                    address: cdek_data.address,
                    zip: cdek_data.zip
                }
            }}
        ).then(r => {
            _callback(r.data);
        }).catch(e => {
            console.log(e);
            if(e.status == 409) {
                _onStockError();
            }
        });
    }

    static async getOrder(id: string) {
        const res = await axios.get(
            `${API_URL}/order?id=${id}`
        );

        return res.data;
    }

    static async getOrdersList() {
        const res = await axios.get(
            `${API_URL}/orders/my-list`
        );

        return res.data.data as Array<Order>;
    }
};
