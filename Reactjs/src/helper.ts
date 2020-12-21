import axios from 'axios';
export class API {
    static Get(url: string): Promise<any> {
        return axios.get(url);
    }
    static async GetAsync(url: string): Promise<any> {
        const data = await new Promise((res, rej) => {
            axios
                .get(url)
                .then((result) => {
                    res(result);
                })
                .catch((error) => {
                    rej(error);
                });
        });
        return data;
    }
    static Post(url: string, data: any): Promise<any> {
        return axios.post(url, data);
    }
    static async PostFormData(url: string, data: FormData) {
        return new Promise((res, rej) => {
            axios({
                method: 'post',
                url: url,
                data: data,
                headers: { 'Content-Type': 'multipart/form-data' },
            })
                .then((result) => {
                    res(result);
                })
                .catch((error) => {
                    rej(error);
                });
        });
    }
}
export class HelperFunction {
    static validateEmail(email: string) {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return regex.test(email);
    }
}
