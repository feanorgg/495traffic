import axios from "axios";

const API_URL = "https://api.495traffic.com/api";
axios.defaults.headers.common['Shop-Id'] = '495TRA';

export default class ClientService {
    static async subscribe(email: string) {
        try {
            const res = await axios.post(
                `${API_URL}/subscribe`,
                {
                    "email": email
                }
            );

            return res.status == 200;
        } catch {
            return false;
        }
    }

    static async signUp() {}

    static async signInWithEmailAndPassword({
        email,
        password
    }: {
        email: string,
        password: string
    }) {
        try {
            const res = await axios.post(
                `${API_URL}/users/login?remember`,
                {user: {email: email, password: password}},
                {withCredentials: true}
            );

            return res.data.user;
        } catch(e) {
            console.log(e);
            return {};
        }
    }

    static async signInWithCookies() {
        try {
            const res = await axios.post(
                `${API_URL}/users/login?remember`,
                {},
                { withCredentials: true }
            );

            axios.defaults.headers.common['Authorization'] = `Token ${res.data.user.token}`;

            return res.data.user;
        } catch(e) {
            console.log(e);
            return {};
        }
    }

    static async updateUserInfo({
        firstName,
        lastName,
        email,
        phone
    }: {
        firstName: string,
        lastName: string,
        email: string,
        phone: string
    }) {
        try {
            const res = await axios.patch(
                `${API_URL}/user`,
                {
                    user: {
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                        phone: phone
                    }
                },
                { withCredentials: true }
            );

            return res.data.user;
        } catch(e) {
            console.log(e);
            return {};
        }
    }
};
