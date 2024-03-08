import {BaseUrl, MenuUrl} from "../base";
import axios from "axios";


export const MenuServices = {
    get_list: async () => {
        const url = BaseUrl + MenuUrl
        return axios.get(url)
    },
    get_detail: async (id) => {
        const url = BaseUrl + MenuUrl + `${id}/`
        return axios({
            method: 'get',
            url,
        })
    },
    create: async (data) => {
        const url = BaseUrl + MenuUrl
        return axios.post(url, data)
    },
    update: async (data, id) => {
        const url = BaseUrl + MenuUrl + `${id}/`
        return axios.put(url, data)
    },
    delete: async (id) => {
        const url = BaseUrl + MenuUrl + `${id}/`
        return axios.delete(url)
    }
}