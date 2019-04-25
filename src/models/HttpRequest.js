import axios from "axios"

const nullFct = () => {return null};

class HttpRequest {
    GET = "get";
    POST = "post";

    constructor({beforeReq=nullFct, afterReq=nullFct}={}){
        this.beforeReq = beforeReq.bind(this);
        this.afterReq = afterReq.bind(this);
    }

    request = (url, {
        method=this.GET,
        params={},
        data={}
    }) => {
        this.beforeReq();

        const config = {method, params}
        if(method === this.POST){
            obj.data = data
        }

        return axios(url, config)
            .then((resp) => {
                this.afterReq(resp);
                return resp;
            });
    }
}

export default HttpRequest;