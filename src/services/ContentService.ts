import axios from "axios";

const API_URL = "https://api.495traffic.com/api";
axios.defaults.headers.common['Shop-Id'] = '495TRA';

export default class ContentService {
    static async getContentGroup(id: string) {
        const res = await axios.get(
            `${API_URL}/content?id=${id}`
        );

        return res.data.content_group;
    }
};
