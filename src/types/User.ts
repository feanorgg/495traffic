export default interface User {
    email: string;
    _id: string;
    phone: string;
    favorites: Array<string>;
    cart: Array<string>;
    first_name: string;
    last_name: string;
    other_data: Record<string, any>;
};
