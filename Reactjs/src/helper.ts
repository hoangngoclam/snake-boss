import axios from 'axios';
export class API{
    static Get(url: string): Promise<any>{
        return axios.get(url)
    }
    static Post(url: string, data: any): Promise<any>{
        return axios.post(url,data)
    }
    static async PostFormData(url:string, data:FormData){
        return new Promise((res,rej)=>{
                axios({
                    method: 'post',
                    url: url,
                    data: data,
                    headers: {'Content-Type': 'multipart/form-data' }
                    })
                    .then(result=>{
                        res(result)
                    })
                    .catch(error=>{
                        rej(error)
                    })
            }
        )
    }
}