import axios from 'axios';
export default class API{
    static Get(url: string): Promise<any>{
        return axios.get(url)
    }
    static Post(url: string, data: any): Promise<any>{
        return axios.post(url,data)
    }
}