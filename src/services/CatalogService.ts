import axios from "axios";

// const API_URL = "https://test-gutta-online.ru/api";

const API_URL = "https://api.495traffic.com/api";
axios.defaults.headers.common['Shop-Id'] = '495TRA';

export default class CatalogService {
    static async getProducts({
        page=1
    }: {page: number}) {
        const res = await axios.get(`${API_URL}/catalog?page=${page}`);
        return res.data;
    }

    static async getProduct({
        id,
        alias=""
    }: {id: string, alias?: string}) {
        let url = `${API_URL}/product?`;
        if(alias != "") {
            url += `alias=${alias}`;
        } else {
            url += `id=${id}`;
        }

        const res = await axios.get(url);
        return res.data.product;
    }
}
