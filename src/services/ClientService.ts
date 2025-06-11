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
};
