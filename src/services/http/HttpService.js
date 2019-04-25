import HttpRequest from '../../models/HttpRequest';

import FetchUserFactory from "./fetchUserFactory";
import FetchTodosFactory from "./fetchTodosFactory";


class HttpService extends HttpRequest {
    constructor(opts){
        super(opts);
    }

    fetchUser = FetchUserFactory(this.request);
    fetchTodos = FetchTodosFactory(this.request);
}

export default HttpService;